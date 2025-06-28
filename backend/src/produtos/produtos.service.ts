import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
    constructor(private prisma: PrismaService) { }

    async criarProduto(data: CreateProdutoDto) {
        return this.prisma.produto.create({
            data: data,
        });
    }

    async listarProdutos() {
        return this.prisma.produto.findMany();
    }
}
