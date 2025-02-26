import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { offer } from './entities/offer.entity';
import { users } from 'src/auth/entities/users.entity';

@Module({
  imports:[
      TypeOrmModule.forFeature([offer,users]),
  ],
  controllers: [OfferController],
  providers: [OfferService]
})
export class OfferModule {}
