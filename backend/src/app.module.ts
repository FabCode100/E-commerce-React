import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, ProdutosModule, CategoriasModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
