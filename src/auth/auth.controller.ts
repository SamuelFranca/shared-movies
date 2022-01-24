import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    @Post('register')
    async postRegister(@Body() createUserDto: CreateUserDto) {

        return createUserDto
    }
}
