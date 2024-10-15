import { IsOptional, IsString } from "class-validator";

export class Estado {

  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  UF?: string;

}
