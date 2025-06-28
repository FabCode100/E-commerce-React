import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriasController {
    constructor(private categoriasService: CategoriasService) { }

    @Post()
    criar(@Body() data: CreateCategoriaDto) {
        return this.categoriasService.criarCategoria(data);
    }

    @Get()
    listar() {
        return this.categoriasService.listarCategorias();
    }
}
