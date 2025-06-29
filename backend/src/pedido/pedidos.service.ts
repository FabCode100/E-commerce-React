import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) { }

  async criarPedido(data: CreatePedidoDto, usuarioId: string) {
    const total = data.itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);

    return this.prisma.pedido.create({
      data: {
        usuarioId,
        enderecoId: data.enderecoId,
        total,
        itens: {
          create: data.itens.map((item) => ({
            quantidade: item.quantidade,
            precoUnit: item.precoUnitario,
            produto: { connect: { id: item.produtoId } },
          })),
        },
      },
      include: { itens: true, endereco: true },
    });
  }

  async listarPedidos() {
    return this.prisma.pedido.findMany({
      include: { itens: true, endereco: true },
    });
  }
}
