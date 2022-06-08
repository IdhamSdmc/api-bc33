import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){
        
    }

    @Post('signup')
    signup(@Body() dto: any){

         return console.log(dto)
    }

    @Post('signin')
    signin(){

    }
}
