import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePedidoDto {
    @IsArray()
    @IsNotEmpty({ each: true })
    itens: {
        produtoId: string;
        quantidade: number;
        precoUnitario: number;
    }[];

    @IsString()
    @IsNotEmpty()
    enderecoId: string; // Endereço vinculado ao pedido
}
