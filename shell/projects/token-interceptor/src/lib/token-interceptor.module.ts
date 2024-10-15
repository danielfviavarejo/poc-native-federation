import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AutenticacaoAPI } from './autenticacao.api';
import { CacheRequestInterceptor } from './cache-request.interceptor';
import { InternetInterceptor } from './internet-interceptor';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';
import { EnvironmentService } from './service/environment.service';
import { TokenInterceptor } from './token.interceptor';
// TODO: Alterar nome da lib pois ela intercepta mais coisas alem do token
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InternetInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheRequestInterceptor,
      multi: true
    },
    EnvironmentService,
    AutenticacaoAPI
  ]
})
export class TokenInterceptorModule { }
