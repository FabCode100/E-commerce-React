import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) { }

    @Post()
    criar(@Body() data: CreateProdutoDto) {
        return this.produtosService.criarProduto(data);
    }

    @Get()
    listar() {
        return this.produtosService.listarProdutos();
    }
}
