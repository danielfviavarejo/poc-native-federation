import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Erro } from "@vv/viamais-app-android-communication";
import { ApiError } from "./model/apiError";

@Injectable({providedIn: 'root'})
export class ErrorMessageAdapter {

  viamaisApiHttpErrorToErro(httpErrorResponse: HttpErrorResponse): Erro {
    if(httpErrorResponse && httpErrorResponse.error && httpErrorResponse.error.details) {
      const erroResponse: Erro = { mensagem: '' };

      httpErrorResponse.error.details.map((erro: ApiError) => {
        erroResponse.mensagem += ` ${erro.description}`;
      });

      return erroResponse;
    }

    throw new Error('Parametro não suportado pela função');
  }

  viamaisApiHttpErrorToErroArray(httpErrorResponse: HttpErrorResponse): Erro[] {
    if(httpErrorResponse && httpErrorResponse.error && httpErrorResponse.error.details) {
      const erros: Erro[] = [];

      httpErrorResponse.error.details.map((erro: ApiError) => {
        erros.push({
          mensagem: erro.description,
          codigo: erro.code,
          tipoInstrucao: erro.tag
        });
      });

      return erros;
    }

    throw new Error('Parametro não suportado pela função');
  }
}
