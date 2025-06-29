import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    criar(@Body() data: CreateProdutoDto) {
        return this.produtosService.criarProduto(data);
    }
    
    @Get()
    listar() {
        return this.produtosService.listarProdutos();
    }
}
