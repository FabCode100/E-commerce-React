import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PagamentoDto } from './dto/pagamento.dto';

@Injectable()
export class PagamentoService {
    constructor(private prisma: PrismaService) { }

    async realizarPagamento(pedidoId: string, usuarioId: string, data: PagamentoDto) {
        const pedido = await this.prisma.pedido.findUnique({ where: { id: pedidoId } });

        if (!pedido || pedido.usuarioId !== usuarioId) throw new NotFoundException('Pedido inválido');
        if (pedido.status === 'pago') throw new BadRequestException('Já foi pago');

        return this.prisma.pedido.update({
            where: { id: pedidoId },
            data: {
                status: 'pago',
                metodoPagamento: data.metodo,
                pagoEm: new Date(),
            },
        });
    }
}
