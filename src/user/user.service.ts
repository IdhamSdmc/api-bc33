import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){

    }

    async getAllUsers(){
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                dni: true,
                nombres: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
        
        return users;
    }

    async searchUsers(search: any){
       
        const user = await this.prisma.$queryRaw`
        SELECT user.id, user.dni, user.nombres,user.email, user.createdAt, user.updatedAt 
        FROM user where user.dni LIKE ${`%${search}%`} or user.nombres LIKE ${`%${search}%`} or user.email LIKE ${`%${search}%`}
        `;
        
        return user;
        

        
    }
}
