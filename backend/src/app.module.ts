import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PedidosModule } from './pedido/pedidos.module';
import { EnderecoModule } from './endereco/endereco.module';
import { PagamentoModule } from './pagamento/pagamento.module';

@Module({
  imports: [PrismaModule, ProdutosModule, CategoriasModule, UsersModule, AuthModule, PedidosModule, EnderecoModule, PagamentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
