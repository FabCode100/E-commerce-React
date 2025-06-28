import { IsString, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateProdutoDto {
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsNumber()
    @Min(0)
    preco: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantidade?: number;

    @IsOptional()
    @IsString()
    categoriaId?: string;

    @IsOptional()
    @IsUrl()
    imagemUrl?: string;
}
