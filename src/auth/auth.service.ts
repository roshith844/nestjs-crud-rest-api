import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClient, Prisma } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    signIn() {
        return 'logged In'
    }
    async signUp(dto: AuthDto) {
        try {
            // generate the password hash
            const hash = await argon.hash(dto.password)
            // save to database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                },
                select: {
                    email: true
                }
            })
            // return user
            return user
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken')
                }
            }
            throw error
        }

    }
}