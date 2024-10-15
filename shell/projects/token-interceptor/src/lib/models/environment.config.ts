export enum EnvironmentConfig {
  SIT = 'https://api-figital-sit.via.com.br/',
  HLG = 'https://api-figital-hlg.via.com.br/',
  STG = 'https://api-figital-stg.via.com.br/',
  PRD = 'https://api-figital.via.com.br/'
};

export type EnvironmentType = keyof typeof EnvironmentConfig;
