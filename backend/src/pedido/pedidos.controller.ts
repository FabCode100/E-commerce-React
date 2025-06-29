import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pedidos')
@UseGuards(JwtAuthGuard)
export class PedidosController {
    constructor(private pedidosService: PedidosService) { }

    @Post()
    criar(@Body() data: CreatePedidoDto, @Request() req) {
        return this.pedidosService.criarPedido(data, req.user.id);
    }

    @Get()
    listar() {
        return this.pedidosService.listarPedidos();
    }
}
