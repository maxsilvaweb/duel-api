import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessedDataModule } from '@/modules/processed-data/processed-data.module';
import { getDatabaseConfig } from '@/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = (await getDatabaseConfig(configService)) ?? null;
        if (!config) {
          throw new Error('Failed to load database configuration');
        }
        return config;
      },
      inject: [ConfigService],
    }),
    ProcessedDataModule,
  ],
  controllers: [],
})
export class AppModule {}
