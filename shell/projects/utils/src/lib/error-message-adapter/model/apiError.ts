import {TipoInstrucao} from '../../models';

export interface ApiError {
  description: string;
  code: string;
  tag: TipoInstrucao;
}
