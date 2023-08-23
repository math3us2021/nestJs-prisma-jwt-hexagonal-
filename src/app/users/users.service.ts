import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    await this.prisma.users.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      },
    });
    return data;
  }

  async findAll() {
    return await this.prisma.users.findMany();
    // return await this.usersRepository.find({
    //   select: ['id', 'firstName', 'lastName', 'email'],
    // });
  }
  //
  // async findOne(id: string) {
  //   // return this.usersRepository.findOne({
  //   //   // select: ['id', 'firstName', 'lastName', 'email'],
  //   //   where: [{ id }],
  //   // });
  // }
  //
  async findOneByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }
  //
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   // const user = await this.usersRepository.findOne({
  //   //   where: [{ id }],
  //   // });
  //   // this.usersRepository.merge(user, updateUserDto);
  //   // return this.usersRepository.save(user);
  // }
  //
  // async remove(id: string) {
  //   // const user = await this.usersRepository.findOne({
  //   //   where: [{ id }],
  //   // });
  //   // if (!user) return null;
  //   // return this.usersRepository.softDelete(id);
  // }
}
