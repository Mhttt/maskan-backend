import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/common/decorator/error/routeAuth.decorator';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login with email and password',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Returns access token' })
  @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'Unathorized', 'Not authorized')
  @ApiErrorDecorator(HttpStatus.NOT_FOUND, 'Not found', 'Customer not found')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
