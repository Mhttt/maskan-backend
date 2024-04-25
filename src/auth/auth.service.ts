import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/common/util/password';
import { UserService } from 'src/user/user.service';

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
        const payload = { subject: user._id, email: user.email.toLowerCase(), roles: user.roles };
        const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET });
        return {
          access_token: token,
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
