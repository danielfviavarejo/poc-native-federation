import { Inject, Injectable } from '@angular/core';
import { EnvironmentConfig, EnvironmentType } from '../models/environment.config';
import { ENVIRONMENT_TOKEN } from '../models/environment.tokens';

@Injectable()
export class EnvironmentService {
  private apiRefreshToken = EnvironmentConfig.PRD;

  constructor(@Inject(ENVIRONMENT_TOKEN) private environment: EnvironmentType) {
    this.apiRefreshToken = EnvironmentConfig[this.environment];
  }

  buscarUrlRefreshToken(): string {
    return this.apiRefreshToken;
  }
}
