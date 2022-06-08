import { Injectable } from '@nestjs/common';
import { User } from "@prisma/client";
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){

    }
    

    async signup(dto: AuthDto){
        // generate the password hash for the user
        const hash = await argon.hash(dto.password);


        // save the new user in the db
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
        return user;
    }

    login(){
        return {
            msg: 'I have signed In',
        }
    }
}
