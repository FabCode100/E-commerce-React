import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

@Module({
    providers: [PedidosService],
    controllers: [PedidosController],
})
export class PedidosModule { }
