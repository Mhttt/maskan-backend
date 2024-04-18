import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    try {
      if (await argon2.verify(user.password, pass)) {
        const payload = { subject: user.password, email: user.email, roles: user.roles };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException('The password is incorrect');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new InternalServerErrorException('There was an error signing in');
      }
    }
  }
}
