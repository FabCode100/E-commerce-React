import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePedidoDto {
  
  @IsArray()
  @IsNotEmpty({ each: true })
  itens: {
    produtoId: string;
    quantidade: number;
    precoUnit: number;
  }[];

  @IsString()
  @IsNotEmpty()
  enderecoId: string;

  @IsString()
  @IsNotEmpty()
  metodoPagamento: string;
}
