import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { EncryptionModule } from '../encryption/encryption.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, EncryptionModule],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
