import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { offer } from './entities/offer.entity';
import { CreateOfferhDto } from './dto/create-offer.dto';
import generateRandomId from 'src/methods/generateRandomId';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OfferService {
    constructor(
        @InjectRepository(offer)
        private readonly offerModule:Repository<offer> 
    ){}

    async create(data:CreateOfferhDto){
        
        if (!data.customer || !data.yachtName || !data.yachtModel || !data.countryCode) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }

        try {
            const generateId = generateRandomId();

            const result = await this.offerModule.save(
                this.offerModule.create({
                    id: generateId,
                    customer: data.customer,
                    yachtName: data.yachtName,
                    yachtModel: data.yachtModel,
                    comment: data.comment || '',
                    countryCode:data.countryCode
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
}
