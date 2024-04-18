import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    try {
      if (await argon2.verify(user.password, pass)) {
        const { ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
      } else {
        return new UnauthorizedException('The password is incorrect');
      }
    } catch (err) {
      return new InternalServerErrorException('There was an error signing in');
    }
  }
}
