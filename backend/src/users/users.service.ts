import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async criarUsuario(data: CreateUserDto) {
        const userExist = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExist) {
            throw new ConflictException('Email já está em uso');
        }

        const hashedSenha = await bcrypt.hash(data.senha, 10);

        return this.prisma.user.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hashedSenha,
            },
        });
    }

    async listarUsuarios() {
        return this.prisma.user.findMany({
            select: { id: true, nome: true, email: true, criadoEm: true },
        });
    }
}
