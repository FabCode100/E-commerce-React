import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [PagamentoController],
    providers: [PagamentoService, PrismaService],
})
export class PagamentoModule { }
