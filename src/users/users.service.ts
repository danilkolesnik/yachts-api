import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { users } from 'src/auth/entities/users.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private readonly usersRepository: Repository<users>,
  ) {}

  async allUsers() {
    try {
      const allUsers = await this.usersRepository.find({
        where: { role: Not('admin') },
      });
      return {
        code: 200,
        data: allUsers,
      };
    } catch (err) {
      return {
        code: 500,
        message: err instanceof Error ? err.message : 'Internal server error',
      };
    }
  }

  async findAllUsersWithRoleUser() {
    try {
      const usersWithRoleUser = await this.usersRepository.find({
        where: { role: 'user' },
      });
      return {
        code: 200,
        data: usersWithRoleUser,
      };
    } catch (err) {
      return {
        code: 500,
        message: err instanceof Error ? err.message : 'Internal server error',
      };
    }
  }

  async updateUserRole(id: string, newRole: string, token: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY) as { id: string, role: string };
      const adminUser = await this.usersRepository.findOne({ where: { id: decodedToken.id } });

      if (!adminUser || adminUser.role !== 'admin') {
        throw new UnauthorizedException('Only admin users can change roles');
      }

      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        return {
          code: 404,
          message: 'User not found',
        };
      }

      user.role = newRole;
      const updatedUser = await this.usersRepository.save(user);

      return {
        code: 200,
        data: updatedUser,
      };
    } catch (err) {
      return {
        code: 500,
        message: err instanceof Error ? err.message : 'Internal server error',
      };
    }
  }
}