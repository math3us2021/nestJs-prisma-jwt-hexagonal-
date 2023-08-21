import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({
      // select: ['id', 'firstName', 'lastName', 'email'],
      where: [{ id }],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: [{ id }],
    });
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      where: [{ id }],
    });
    if (!user) return null;
    return this.usersRepository.softDelete(id);
  }
}
