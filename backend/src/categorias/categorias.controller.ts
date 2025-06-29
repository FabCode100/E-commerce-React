import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('categorias')
export class CategoriasController {
    constructor(private categoriasService: CategoriasService) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    criar(@Body() data: CreateCategoriaDto) {
        return this.categoriasService.criarCategoria(data);
    }

    @Get()
    listar() {
        return this.categoriasService.listarCategorias();
    }
}
