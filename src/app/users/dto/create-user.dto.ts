import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegexHelper } from '../../../helpers/regex.helper';
import { MessageHelpers } from '../../../helpers/message.helpers';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, { message: MessageHelpers.PASSWORD_VALID })
  password: string;
}
