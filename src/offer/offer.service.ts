import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { offer } from './entities/offer.entity';
import { CreateOfferhDto } from './dto/create-offer.dto';
import generateRandomId from 'src/methods/generateRandomId';
import { users } from 'src/auth/entities/users.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(offer)
    private readonly offerRepository: Repository<offer>,
    @InjectRepository(users)
    private readonly usersRepository: Repository<users>,
  ) {}

  async create(data: CreateOfferhDto) {
    if (!data.customerFullName || !data.yachtName || !data.yachtModel || !data.countryCode || !data.services || !data.parts || !data.status) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const customer = await this.usersRepository.findOne({ where: { fullName: data.customerFullName } });
      if (!customer) {
        return {
          code: 404,
          message: 'Customer not found',
        };
      }

      const generateId = generateRandomId();

      const result = await this.offerRepository.save(
        this.offerRepository.create({
          id: generateId,
          customerFullName: customer.fullName,
          yachtName: data.yachtName,
          yachtModel: data.yachtModel,
          comment: data.comment || '',
          countryCode: data.countryCode,
          services: data.services,
          parts: data.parts,
          status: data.status,
          versions: [],
          createdAt: new Date(),
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

  async update(id: string, data: Partial<CreateOfferhDto>) {
    try {
      const offer = await this.offerRepository.findOne({ where: { id } });

      if (!offer) {
        return {
          code: 404,
          message: 'Offer not found',
        };
      }

      const updatedOffer = Object.assign(offer, data);
      updatedOffer.versions.push({ ...offer });

      const result = await this.offerRepository.save(updatedOffer);

      return {
        code: 200,
        data: result,
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async findAll() {
    try {
      const offers = await this.offerRepository.find();
      return {
        code: 200,
        data: offers,
      };
    } catch (err) {
      return {
        code: 500,
        message: err instanceof Error ? err.message : 'Internal server error',
      };
    }
  }
}