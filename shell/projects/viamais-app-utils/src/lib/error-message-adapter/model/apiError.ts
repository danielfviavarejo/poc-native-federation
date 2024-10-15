import { TipoInstrucao } from "@vv/viamais-app-android-communication";

export interface ApiError {
  description: string;
  code: string;
  tag: TipoInstrucao;
}
