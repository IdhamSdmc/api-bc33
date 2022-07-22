import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: UserModel) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get(':search')
  findUsers(@Param('search') search: any) {
    return this.userService.searchUsers(search);
  }

  // getMe(@Req() req: Request){
  //     return req.user;
  // }
}
