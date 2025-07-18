import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'sua_chave_secreta_aqui', // Use variável de ambiente depois
        });
    }

    async validate(payload: { sub: string; email: string }) {
        return { id: payload.sub, email: payload.email };
    }
}
