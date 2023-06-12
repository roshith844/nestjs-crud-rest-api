import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    signIn() {
        return 'logged In'
    }
    async signUp(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password)
        // save to database
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
            select: {
                email: true
            }
        })
        // return user
        return user
    }
}