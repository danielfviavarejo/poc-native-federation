import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Cliente } from './cliente';
import { TipoCliente } from './tipo-cliente.enum';
import { Endereco } from './endereco';

// @dynamic
export class DadosCliente {
  @ValidateNested()
  @Type(() => Cliente)
  cliente!: Cliente;

  @IsOptional()
  @IsString()
  tipoCliente?: TipoCliente;

  @IsOptional()
  @ValidateNested()
  @Type(() => Endereco)
  endereco?: Endereco;
  // celular: Celular;
  // optInSms: boolean;
  // optInEmail: boolean;
  // statusCadastroCliente: string;
}
