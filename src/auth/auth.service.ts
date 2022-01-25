import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly encryptionService:EncryptionService) {}

    async validateUser(email:string, password: string) {

        const user = await this.userService.findByEmail(email);

        if ( user !== undefined && this.encryptionService.compare(password, (<Record<string, any>>user.properties).password )) {

            return user;
        }
    }
}
