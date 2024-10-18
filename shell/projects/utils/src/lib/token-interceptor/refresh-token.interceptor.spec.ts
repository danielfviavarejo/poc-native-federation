import { HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AutenticacaoAPI } from './autenticacao.api';
import { ENVIRONMENT_TOKEN } from './models/environment.tokens';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';
import { EnvironmentService } from './service/environment.service';
import {App, SessaoService, Venda} from '../sessao';
import {Bandeira} from '../models';

describe(RefreshTokenInterceptor.name, () => {

  let interceptor: RefreshTokenInterceptor;
  let sessaoService: SessaoService;
  let httpMock: HttpTestingController;
  let autenticacaoAPI: AutenticacaoAPI;

  const next = { handle: jest.fn() } as any;
  const requestMock = new HttpRequest('GET', '/test');
  const routerSpy = {
    navigate: jest.spyOn(Router.prototype, 'navigate')
      .mockImplementation(() => Promise.resolve(true))
  };

  const sessaoAPP: App = {
    autenticacao: {
      token: 'token',
      refreshToken: 'refreshToken',
    },
    resiliencia: true,
    plataformaWebview: false
  };

  const sessaoVenda: Venda = {
    filial: {
      bandeira: Bandeira.CASAS_BAHIA,
      codigo: 1000,
      empresa: 21,
      nome: 'Filial numero 1000'
    },
    vendedor: {
      nome: 'Jack Skeleton',
      empresa: 21,
      matricula: 123456
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({// Add this line
      providers: [
        provideHttpClientTesting(),
        RefreshTokenInterceptor,
        SessaoService,
        { provide: AutenticacaoAPI, useValue: { atualizarToken: jest.fn() } },
        EnvironmentService,
        { provide: Router, useValue: routerSpy },
        { provide: ENVIRONMENT_TOKEN, useValue: 'HLG' }
      ]
    });

    interceptor = TestBed.inject(RefreshTokenInterceptor);
    sessaoService = TestBed.inject(SessaoService);
    autenticacaoAPI = TestBed.inject(AutenticacaoAPI);
    httpMock = TestBed.inject(HttpTestingController); // Ensure this is correctly injected
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(`${RefreshTokenInterceptor.name} deve ser criado.`, () => {
    expect(interceptor).toBeTruthy();
  });

  it(`Método ${RefreshTokenInterceptor.prototype.intercept.name} deve ser chamado com status code igual 401`, () => {

    sessaoService.iniciar(sessaoVenda, sessaoAPP);
    const interceptSpyOn = jest.spyOn(interceptor, 'intercept');
    const nextMock$ = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        if (req === requestMock) {
          return throwError(() => new HttpErrorResponse({ status: 401 }));
        }
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(requestMock, nextMock$).subscribe(() => expect(interceptSpyOn).toHaveBeenCalled());
  });

  it(`Método ${RefreshTokenInterceptor.prototype.intercept.name} deve ser chamado com status code diferente de 401`, () => {

    sessaoService.iniciar(sessaoVenda, sessaoAPP);
    const interceptSpyOn = jest.spyOn(interceptor, 'intercept');
    const nextMock$ = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        if (req === requestMock) {
          return throwError(() =>new HttpErrorResponse({ status: 500 }));
        }
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(requestMock, nextMock$).subscribe(() => expect(interceptSpyOn).toHaveBeenCalled());
  });

  it(`Método ${(RefreshTokenInterceptor as any).prototype.atualizarTokens.name} deve ser chamado com o refreshToken salvo na sessão.`, () => {

    new SessaoService().iniciar(sessaoVenda, sessaoAPP);
    const atualizarToken = jest.spyOn(autenticacaoAPI as any, 'atualizarToken')
      .mockReturnValue(of({} as any));

    sessaoService.iniciar(sessaoVenda, sessaoAPP);
    (interceptor as any)['atualizarTokens'](requestMock, next);

    expect(atualizarToken).toHaveBeenCalledWith(sessaoService.app.autenticacao.refreshToken);
  });

  it(`Método ${(RefreshTokenInterceptor as any).prototype.tratarErroAtualizarToken.name} deve ser chamado quando atualizarToken de autenticacaoAPI retornar erro.`, () => {
    jest.spyOn(autenticacaoAPI as any, 'atualizarToken')
      .mockReturnValue(throwError(new HttpErrorResponse({ status: 401 })));

    const tratarErroAtualizarToken = jest.spyOn(interceptor as any, 'tratarErroAtualizarToken');

    (interceptor as any).atualizarTokens(requestMock, next).subscribe({
      error: () => {
        expect(tratarErroAtualizarToken).toHaveBeenCalled();
      }
    });
  });

  it(`Método ${(RefreshTokenInterceptor as any).prototype.redirecionarParaLogin.name} deve ser chamado quando tratarErroAtualizarToken receber um erro 401.`, () => {
    const redirecionarParaLogin = jest.spyOn(interceptor as any, 'redirecionarParaLogin');

    (interceptor as any)['tratarErroAtualizarToken'](new HttpErrorResponse({ status: 401 }));

    expect(redirecionarParaLogin).toHaveBeenCalled();
  })
});
