import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class PagamentoDto {
    @IsString()
    @IsIn(['pix', 'cartao', 'boleto', 'manual'])
    metodo: string; // agora aceita 'manual'
}
