import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { offer } from './entities/offer.entity';

@Module({
  imports:[
      TypeOrmModule.forFeature([offer]),
  ],
  controllers: [OfferController],
  providers: [OfferService]
})
export class OfferModule {}
