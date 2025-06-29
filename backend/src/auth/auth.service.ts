import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    async login(email: string, senha: string) {
        const user = await this.usersService.buscarPorEmail(email);

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            token,
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email,
            },
        };
    }
}
