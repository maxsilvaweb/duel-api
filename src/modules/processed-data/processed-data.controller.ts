import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProcessedDataService } from './processed-data.service';
import { ProcessedData } from '../../entities/processed-data.entity';
import { QueryProcessedDataDto } from './dto/query-processed-data.dto';

@ApiTags('processed-data')
@Controller('api/v1/processed-data')
export class ProcessedDataController {
  constructor(private readonly processedDataService: ProcessedDataService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all processed data with filtering and pagination',
  })
  @ApiResponse({ status: 200, description: 'Success', type: [ProcessedData] })
  async findAll(@Query() queryDto: QueryProcessedDataDto) {
    return this.processedDataService.findAll(queryDto);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get analytics overview' })
  @ApiResponse({ status: 200, description: 'Analytics data' })
  async getAnalytics() {
    return this.processedDataService.getAnalytics();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all data for a specific user' })
  @ApiResponse({ status: 200, description: 'User data', type: [ProcessedData] })
  async findByUserId(@Param('userId') userId: string) {
    const data = await this.processedDataService.findByUserId(userId);
    if (!data.length) {
      throw new NotFoundException(`No data found for user ${userId}`);
    }
    return { data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Record found',
    type: ProcessedData,
  })
  @ApiResponse({ status: 404, description: 'Record not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.processedDataService.findById(id);
    if (!data) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return data;
  }
}
