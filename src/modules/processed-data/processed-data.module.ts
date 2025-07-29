import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessedDataController } from './processed-data.controller';
import { ProcessedDataService } from './processed-data.service';
import { ProcessedData } from '../../entities/processed-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessedData])],
  controllers: [ProcessedDataController],
  providers: [ProcessedDataService],
  exports: [ProcessedDataService],
})
export class ProcessedDataModule {}
