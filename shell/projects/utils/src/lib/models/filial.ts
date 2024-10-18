import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Bandeira } from './bandeira.enum';

// @dynamic
export class Filial {

  @Transform(({ value }) => {
    switch (value) {
      case 1:
        return Bandeira.CASAS_BAHIA;
      case 2:
        return Bandeira.PONTO;
      default:
        return value;
    }
  })
  @IsEnum(Bandeira)
  bandeira!: Bandeira;

  @IsNumber()
  codigo!: number;

  @IsNumber()
  empresa!: number;

  @IsString()
  nome!: string;

  dadosBandeira?: {
    tipo: Bandeira;
    nome: 'Casas Bahia' | 'Ponto';
    codigo: number;
  };
}
