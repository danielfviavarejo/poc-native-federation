import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { CacheRequestInterceptor } from './cache-request.interceptor';

describe(`${CacheRequestInterceptor.name}`, () => {
  let interceptor: CacheRequestInterceptor;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    interceptor = new CacheRequestInterceptor();
    httpHandler = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse()))
    } as any;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should return response from ReplaySubject for duplicate POST request', done => {
    const duplicateBody = { data: 'test' };
    const request = new HttpRequest('POST', 'https://api.example.com/vv-crm', duplicateBody);

    interceptor.intercept(request, httpHandler).subscribe();

    interceptor.intercept(request, httpHandler).subscribe(response => {
      expect(response).toBeInstanceOf(HttpResponse);
      done();
    });
  });

  it('should intercept the request and return cached response', () => {
    const request = new HttpRequest('POST', 'http://example.com/api/vv-crm', {});
    const expectedResponse = new HttpResponse();

    const result$ = interceptor.intercept(request, httpHandler);

    result$.subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(httpHandler.handle).not.toHaveBeenCalled();
    });
  });

  it('should intercept the request and return cached response', () => {
    const requestMock = new HttpRequest('GET', 'https://example.com/vv-crm');

    const retorno = interceptor.intercept(requestMock, httpHandler);

    expect(retorno).toEqual(httpHandler.handle(requestMock));
  });

  it('Ao chamar o método transformarChaveRequest ele deve monstar a chave com os dados da URL e do body', () => {
    const requestMock = new HttpRequest('POST', 'https://example.com/vv-crm', { data: 'test' });
    const key = interceptor['transformarChaveRequest'](requestMock);

    expect(key).toEqual('https://example.com/vv-crm|datatest');
  });

  it('should return true if the request URL includes "vv-crm"', () => {
    const request = new HttpRequest('GET', 'https://example.com/vv-crm/api');
    const result = interceptor['isRequestCrm'](request);

    expect(result).toBeTruthy();
  });

  it('should return false if the request URL does not include "vv-crm"', () => {
    const request = new HttpRequest('GET', 'https://example.com/api');
    const result = interceptor['isRequestCrm'](request);

    expect(result).toBeFalsy();
  });
});
