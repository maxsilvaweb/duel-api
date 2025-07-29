import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ProcessedData } from '../../entities/processed-data.entity';
import { QueryProcessedDataDto } from './dto/query-processed-data.dto';

@Injectable()
export class ProcessedDataService {
  constructor(
    @InjectRepository(ProcessedData)
    private processedDataRepository: Repository<ProcessedData>,
  ) {}

  async findAll(queryDto: QueryProcessedDataDto) {
    const {
      page = 1,
      limit = 10,
      user_id,
      brand,
      platform,
      search,
      sort_by = 'id',
      sort_order = 'ASC',
    } = queryDto;

    const queryBuilder =
      this.processedDataRepository.createQueryBuilder('data');

    // Apply filters
    this.applyFilters(queryBuilder, { user_id, brand, platform, search });

    // Apply sorting
    queryBuilder.orderBy(`data.${sort_by}`, sort_order);

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Execute query
    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  async findByUserId(userId: string) {
    return this.processedDataRepository.find({
      where: { user_id: userId },
      order: { created_at: 'ASC' },
    });
  }

  async findById(id: number) {
    return this.processedDataRepository.findOne({ where: { id } });
  }

  async getAnalytics() {
    const totalRecords = await this.processedDataRepository.count();

    const platformStats = await this.processedDataRepository
      .createQueryBuilder('data')
      .select(
        'data.platform, COUNT(*) as count, SUM(data.likes) as total_likes, SUM(data.reach) as total_reach',
      )
      .groupBy('data.platform')
      .getRawMany();

    const brandStats = await this.processedDataRepository
      .createQueryBuilder('data')
      .select(
        'data.brand, COUNT(*) as count, SUM(data.total_sales_attributed) as total_sales',
      )
      .groupBy('data.brand')
      .orderBy('total_sales', 'ASC')
      .limit(10)
      .getRawMany();

    const topPerformers = await this.processedDataRepository
      .createQueryBuilder('data')
      .select(
        'data.name, data.email, SUM(data.likes) as total_likes, SUM(data.reach) as total_reach',
      )
      .groupBy('data.name, data.email')
      .orderBy('total_reach', 'ASC')
      .limit(10)
      .getRawMany();

    return {
      totalRecords,
      platformStats,
      brandStats,
      topPerformers,
    };
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<ProcessedData>,
    filters: {
      user_id?: string;
      brand?: string;
      platform?: string;
      search?: string;
    },
  ) {
    const { user_id, brand, platform, search } = filters;

    if (user_id) {
      queryBuilder.andWhere('data.user_id = :user_id', { user_id });
    }

    if (brand) {
      queryBuilder.andWhere('data.brand ILIKE :brand', { brand: `%${brand}%` });
    }

    if (platform) {
      queryBuilder.andWhere('data.platform ILIKE :platform', {
        platform: `%${platform}%`,
      });
    }

    if (search) {
      queryBuilder.andWhere(
        '(data.name ILIKE :search OR data.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }
  }
}
