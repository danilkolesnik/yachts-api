import { 
    Controller,
    Post,
    Body,
    Param,
    Put,
    Get
 } from '@nestjs/common';
import { CreateWareHourehDto } from './dto/create-wareHoure.dto';
import { WarehouseService } from './warehouse.service';
@Controller('warehouse')
export class WarehouseController {
    constructor(private readonly warehouseService:WarehouseService){}

    @Post('create')
    create(@Body() data: CreateWareHourehDto){
        return this.warehouseService.create(data)
    }

    @Post('delete')
    delete(@Param('id') id: string){
        return this.warehouseService.deleteById(id)
    }

    @Put(':id')
    async updateWarehouse(@Param('id') id: string, @Body() data: Partial<CreateWareHourehDto>) {
        return this.warehouseService.update(id, data);
    }

    @Get()
    async getAllWarehouses() {
        return this.warehouseService.findAll();
    }
}
