import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('processed_data')
export class ProcessedData {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User UUID' })
  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @ApiProperty({ description: 'User name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'User email' })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({ description: 'Instagram handle' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram_handle: string;

  @ApiProperty({ description: 'TikTok handle' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  tiktok_handle: string;

  @ApiProperty({ description: 'Date user joined' })
  @Column({ type: 'timestamp', nullable: true })
  joined_at: Date;

  @ApiProperty({ description: 'Program ID' })
  @Column({ type: 'varchar', length: 255 })
  program_id: string;

  @ApiProperty({ description: 'Brand name' })
  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @ApiProperty({ description: 'Task ID' })
  @Column({ type: 'varchar', length: 255 })
  task_id: string;

  @ApiProperty({ description: 'Social media platform' })
  @Column({ type: 'varchar', length: 255 })
  platform: string;

  @ApiProperty({ description: 'Post URL' })
  @Column({ type: 'text' })
  post_url: string;

  @ApiProperty({ description: 'Number of likes' })
  @Column({ type: 'integer', default: 0 })
  likes: number;

  @ApiProperty({ description: 'Number of comments' })
  @Column({ type: 'integer', default: 0 })
  comments: number;

  @ApiProperty({ description: 'Number of shares' })
  @Column({ type: 'integer', default: 0 })
  shares: number;

  @ApiProperty({ description: 'Post reach' })
  @Column({ type: 'integer', default: 0 })
  reach: number;

  @ApiProperty({ description: 'Total sales attributed' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_sales_attributed: number;

  @ApiProperty({ description: 'Source file name' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  source_file: string;

  @ApiProperty({ description: 'Record creation timestamp' })
  @CreateDateColumn()
  created_at: Date;
}