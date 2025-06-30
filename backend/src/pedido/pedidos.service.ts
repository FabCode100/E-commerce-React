import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) { }

  async criarPedido(data: CreatePedidoDto, usuarioId: string) {
    const total = data.itens.reduce((acc, item) => acc + item.precoUnit * item.quantidade, 0);

    return this.prisma.pedido.create({
      data: {
        usuarioId,
        enderecoId: data.enderecoId,
        total,
        metodoPagamento: data.metodoPagamento,
        itens: {
          create: data.itens.map((item) => ({
            quantidade: item.quantidade,
            precoUnit: item.precoUnit,
            produto: { connect: { id: item.produtoId } },
          })),
        },
      },
      include: {
        itens: {
          include: { produto: true },
        },
        endereco: true,
      },
    });
  }

  async listarPedidos() {
    return this.prisma.pedido.findMany({
      include: {
        itens: {
          include: { produto: true },
        },
        endereco: true,
      },
    });
  }
}
