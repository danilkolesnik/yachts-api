import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { warehouse } from './entities/warehouse.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([warehouse]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
