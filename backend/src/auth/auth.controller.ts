import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';  // Guard para proteger a rota
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() body: { email: string; senha: string }) {
        return this.authService.login(body.email, body.senha);
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    perfil(@Req() req: Request) {
        const usuario = req.user as { id: string; nome: string; email: string };
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        };
    }
}
