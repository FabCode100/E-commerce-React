import { Controller, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoDto } from './dto/pagamento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pagamentos')
export class PagamentoController {
    constructor(private svc: PagamentoService) { }

    @Patch(':id')
    pagar(@Param('id') pedidoId: string, @Body() data: PagamentoDto, @Request() req) {
        return this.svc.realizarPagamento(pedidoId, req.user.id, data);
    }
}
