import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    signIn() {
        return 'logged In'
    }
    signUp() {
        return 'signed Up'
    }
}