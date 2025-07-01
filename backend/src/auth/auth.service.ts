import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async login(email: string, senha: string) {
        const user = await this.usersService.buscarPorEmail(email);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email };

        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
        };
    }
}
