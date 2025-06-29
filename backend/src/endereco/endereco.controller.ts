import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('enderecos')
export class EnderecoController {
    constructor(private enderecoService: EnderecoService) { }

    @Post()
    criar(@Body() data: CreateEnderecoDto, @Request() req) {
        return this.enderecoService.criarEndereco(data, req.user.id);
    }

    @Get()
    listar(@Request() req) {
        return this.enderecoService.listarEnderecos(req.user.id);
    }
}
