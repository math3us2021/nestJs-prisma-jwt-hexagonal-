import { Injectable } from '@nestjs/common';
import { UsersService } from '../app/users/users.service';
import { User } from '../app/users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.usersService.findOneByEmail(email);
    } catch (e) {
      throw new Error(e);
    }
    const isPasswordValid = await compareSync(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
