import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { warehouse } from './entities/warehouse.entity';
import { CreateWareHourehDto } from './dto/create-wareHoure.dto';
import generateRandomId from 'src/methods/generateRandomId';
@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(warehouse)
        private readonly warehouseModule: Repository<warehouse>,
    ){}

    async create(data: CreateWareHourehDto){

        if (!data.name || !data.quantity || !data.inventory || !data.comment) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }

        try {
            const generateId = generateRandomId();

            const result = await this.warehouseModule.save(
                this.warehouseModule.create({
                    id: generateId,
                    name: data.name,
                    quantity: data.quantity,
                    inventory: data.inventory,
                    comment: data.comment
                })
            );

            return {
                code: 201,
                data: result,
            };

            
        } catch (err) {
            return {
              code: 500,
              message: err,
            };
          }
    }

    async deleteById(id: string) {
        if (!id) {
            return {
                code: 400,
                message: 'ID is required',
            };
        }

        try {
            const deleteResult = await this.warehouseModule.delete(id);

            if (deleteResult.affected === 0) {
                return {
                    code: 404,
                    message: 'Warehouse not found',
                };
            }

            return {
                code: 200,
                message: 'Warehouse deleted successfully',
            };
        } catch (err) {
            return {
                code: 500,
                message: err|| 'Internal server error',
            };
        }
    }

    async update(id: string, data: Partial<CreateWareHourehDto>) {
        if (!id || !Object.keys(data).length) {
            return {
                code: 400,
                message: 'ID and at least one field to update are required',
            };
        }

        try {
            const warehouse = await this.warehouseModule.findOne({ where: { id } });

            if (!warehouse) {
                return {
                    code: 404,
                    message: 'Warehouse not found',
                };
            }

            Object.assign(warehouse, data);

            const updatedWarehouse = await this.warehouseModule.save(warehouse);

            return {
                code: 200,
                message: 'Warehouse updated successfully',
                data: updatedWarehouse,
            };
        } catch (err) {
            return {
                code: 500,
                message: err instanceof Error ? err.message : 'Internal server error',
            };
        }
    }

    async findAll() {
        try {
            const warehouses = await this.warehouseModule.find();
            return {
                code: 200,
                data: warehouses,
            };
        } catch (err) {
            return {
                code: 500,
                message: err instanceof Error ? err.message : 'Internal server error',
            };
        }
    }
}
