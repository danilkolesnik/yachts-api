import { 
    Controller,
    Body,
    Post
} from '@nestjs/common';
import { CreateOfferhDto } from './dto/create-offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
    constructor(private readonly offerService:OfferService){}

    @Post('create')
    create(@Body() data: CreateOfferhDto){
        return this.offerService.create(data)
    }
}
