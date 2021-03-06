import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignDto } from './dto/sign.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ){

    }
    

    async signup(dto: AuthDto){
        // generate the password hash for the user
        const hash = await argon.hash(dto.password);


        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    dni: dto.dni,
                    nombres: dto.nombres,
                    email: dto.email,
                    hash
                },
                select: {
                    id: true,
                    dni: true,
                    nombres: true,
                    email: true,
    
                }
            });
    
            // return saved user
            return this.signToken(user.id, user.email);
            
        } catch (error) {
            if(error 
                instanceof 
                PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException(
                        'Credentials Taken'
                    );
                }
            }
            throw error;
        }
    }

    async signin(dto: SignDto){
        //Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        //If user does not exist throw exception
        if(!user) throw new ForbiddenException('Credentials Incorrect');
        //Compare password
        const pwMatches = await argon.verify(user.hash, dto.password);
        //if password is incorrect throw exception
        if(!pwMatches) throw new ForbiddenException('Credentials Incorrect');
        //Send back the user
        
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {
            access_token: token,
        }
    }   

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
