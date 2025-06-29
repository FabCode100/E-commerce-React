import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Injectable()
export class EnderecoService {
    constructor(private prisma: PrismaService) { }

    async criarEndereco(data: CreateEnderecoDto, usuarioId: string) {
        return this.prisma.endereco.create({
            data: {
                ...data,
                usuarioId,
            },
        });
    }

    async listarEnderecos(usuarioId: string) {
        return this.prisma.endereco.findMany({
            where: { usuarioId },
        });
    }
}
