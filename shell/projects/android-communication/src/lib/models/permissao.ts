import { IsString } from "class-validator";

export class Permissao {

  @IsString()
  transacao!: string;

  @IsString()
  descricao!: string;

}
