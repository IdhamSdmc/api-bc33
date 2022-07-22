import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtGuard } from '../auth/guard';
import { AuthDto } from './dto';
import { SignDto } from './dto/sign.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logOut(@Res() response: Response) {
    response.setHeader(
      'Authorization',
      this.authService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
