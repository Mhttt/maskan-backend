import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/common/util/password';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email.toLowerCase());
    try {
      if (await verifyPassword(user.password, pass)) {
        const payload = { subject: user.password, email: user.email.toLowerCase(), roles: user.roles };
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
