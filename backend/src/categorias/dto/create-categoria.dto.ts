import { IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  nome: string;
}
