import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: 'sua_chave_secreta_aqui', // Troque por variável de ambiente no futuro
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, JwtStrategy, UsersService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
