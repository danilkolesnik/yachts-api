import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { users } from './entities/users.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import generateRandomId from 'src/methods/generateRandomId';
import getBearerToken from 'src/methods/getBearerToken';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(users)
        private readonly usersModule: Repository<users>,
    ){}

    async create(data: CreateAuthDto) {
        if (!data.email || !data.password) {
          return {
            code: 400,
            message: 'Not all arguments',
          };
        }

        try {
          const checkUser = await this.usersModule.findOne({
            where: { email: data.email },
          });
          if (checkUser) {
            return {
              code: 409,
              message: 'This user already exists',
            };
          }
    
          const generateId = generateRandomId();
    
          const result = await this.usersModule.save(
            this.usersModule.create({
              id: generateId,
              email: data.email,
              password: bcrypt.hashSync(data.password),
            }),
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

    async loginClient(data: LoginAuthDto) {
      if (!data.email || !data.password) {
        return {
          code: 400,
          message: 'Not all arguments',
        };
      }
  
      try {
        const checkUser = await this.usersModule.findOne({
          where: {
            email: data.email,
          },
        });
  
        if (!checkUser) {
          return {
            code: 404,
            message: 'Not Found',
          };
        }
  
        if (bcrypt.compareSync(data.password, checkUser.password)) {
          return {
            code: 200,
            token: jwt.sign(
              { id: checkUser.id, role: checkUser.role },
              process.env.SECRET_KEY,
            ),
          };
        } else {
          return {
            code: 400,
            message: 'Password is not correct',
          };
        }
      } catch (err) {
        console.log(err);
        return {
          code: 500,
          message: err,
        };
      }
    }

    async verify(req: Request) {
      const token = getBearerToken(req);
      try {
        if (!token) {
          return {
            code: 400,
            message: 'Not all arguments',
          };
        }
        const login = jwt.verify(token, process.env.SECRET_KEY);
        const checkUser = await this.usersModule.findOne({
          where: {
            id: login.id,
          },
        });
  
        if (checkUser) {
          return {
            code: 200,
            data: checkUser,
          };
        }
  
        return {
          code: 404,
          message: 'Not Found',
        };
      } catch (err) {
        return {
          code: 500,
          message: err,
        };
      }
    }
}
