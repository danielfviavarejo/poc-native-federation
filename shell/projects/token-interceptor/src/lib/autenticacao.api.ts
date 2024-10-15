import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvironmentService } from './service/environment.service';

@Injectable()
export class AutenticacaoAPI {

  constructor(
    private envService: EnvironmentService,
    private http: HttpClient,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  atualizarToken(refreshToken: string):
    Observable<{ accessToken: string, refreshToken: string }> {

    const ambienteRefreshToken = this.envService.buscarUrlRefreshToken();
    const body = `refresh_token=${refreshToken}&scope=webclient&grant_type=refresh_token`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic Y2xpZW50YXBwOnBhc3N3b3Jk'
    });

    return this.http.post<{ access_token: string, refresh_token: string }>
      (`${ambienteRefreshToken}uaa/oauth/token`, body, { headers })
      .pipe(
        map(response => ({
          accessToken: response.access_token,
          refreshToken: response.refresh_token
        }))
      );
  }
}
