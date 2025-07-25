import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    criar(@Body() data: CreateUserDto) {
        return this.usersService.criarUsuario(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    listar() {
        return this.usersService.listarUsuarios();
    }
}
