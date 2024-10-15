/* eslint-disable @typescript-eslint/ban-types */

import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Observable, from, throwError } from "rxjs";
import { map } from 'rxjs/operators';

/**
 * @ignore
 */
function achatarArray<T>(array: Array<Array<T>>): Array<T> {
  return array.reduce((a, b) => a.concat(b));
}

function validarArray<T extends object>(validadores: Array<T>): Promise<ValidationError[]> {
  const validacoes = validadores.map(validador => validate(validador));
  return new Promise((resolve) => {
    Promise.all(validacoes).then(erros => resolve(achatarArray(erros)));
  })
}

/**
 * @ignore
 */
function validar<T extends object>(validador: T): Promise<ValidationError[]>;
/**
 * @ignore
 */
function validar<T extends object>(validador: T[]): Promise<ValidationError[]>
/**
 * @ignore
 */
function validar<T extends object>(validador: T | T[]): Promise<ValidationError[]> {
  if (Array.isArray(validador)) {
    return validarArray(validador);
  }
  return validate(validador);
}

/**
 * @ignore
 */
function verificarErros<T>(erros: ValidationError[], valor: T): T {
  if (erros.length) {
    throw erros;
  }
  return valor;
}

/**
 * @ignore
 */
export function transformarEValidar<T extends object, V>(validador: ClassConstructor<T>, valor: V[]): Observable<T[]>

/**
 * @ignore
 */
export function transformarEValidar<T extends object, V>(validador: ClassConstructor<T>, valor: V): Observable<T>

/**
 * validate an object where its typing was built using class-validator
 * @param validador: class to compare and verify, @param valor: current value to validate
 */
export function transformarEValidar<T extends object, V>(validador: ClassConstructor<T>, valor: V | V[]): Observable<T | T[]> {

  if (!valor) return throwError({
    erroValidacao: 'O valor para conversão não pode ser nulo ou indefinido',
    valor,
    classe: validador
  });

  const valorTransformado = plainToClass(validador, valor);
  return from(validar(valorTransformado)).pipe(map(erros => verificarErros(erros, valorTransformado)));
}
