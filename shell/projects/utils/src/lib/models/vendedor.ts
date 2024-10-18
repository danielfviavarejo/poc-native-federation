import { IsNumber, IsString } from 'class-validator';

// @dynamic
export class Vendedor {

  @IsString()
  nome!: string;

  @IsNumber()
  empresa!: number;

  @IsNumber()
  matricula!: number;

}
