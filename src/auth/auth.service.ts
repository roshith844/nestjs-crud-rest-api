import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService { 
signIn(){
    return 'logged In'
}
signUp(){
    return 'signed Up'
}
}