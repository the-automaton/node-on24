import * as querystring from 'querystring';
import * as needle from 'needle';
import { ClientCredentials } from '.';
import { ApiError } from './errors/api-error';

export abstract class ClientBase {
  private needle: typeof needle;

  constructor(private credentials: ClientCredentials, reqLib: any) {
    // Default base URL.
    if (!credentials.baseUrl) {
      this.credentials.baseUrl = 'https://api.on24.com';
    }

    this.needle = reqLib;
  }

  protected get(path: string, params?: Record<string, any>): Promise<any> {
    const options = this.getRequestOptions();
    const url = this.getRequestUrl(path, params);
    return new Promise((resolve, reject) => {
      this.needle.get(url, options, (err, res, body) => {
        if (err) return reject(err);
        if (res.statusCode && res.statusCode > 299) return reject(new ApiError(res, body));
        resolve(body);
      });
    });
  }

  protected post(path: string, data: Record<string, any>): Promise<any> {
    const options = this.getRequestOptions();
    const url = this.getRequestUrl(path);
    return new Promise((resolve, reject) => {
      this.needle.post(url, data, options, (err, res, body) => {
        if (err) return reject(err)
        if (res.statusCode && res.statusCode > 299) return reject(new ApiError(res, body));
        resolve(body);
      });
    });
  }

  protected patch(path: string, data: Record<string, any>): Promise<any> {
    const options = this.getRequestOptions();
    const url = this.getRequestUrl(path);
    return new Promise((resolve, reject) => {
      this.needle.patch(url, data, options, (err, res, body) => {
        if (err) return reject(err)
        if (res.statusCode && res.statusCode > 299) return reject(new ApiError(res, body));
        resolve(body);
      });
    });
  }

  private getRequestOptions() {
    return {
      headers: {
        accessTokenKey: this.credentials.tokenKey,
        accessTokenSecret: this.credentials.tokenSecret
      }
    };
  }

  private getRequestUrl(pathPart: string, params: Record<string, any> = {}) {
    const base = `${this.credentials.baseUrl}/v2/client/${this.credentials.clientId}`;
    const q = querystring.stringify(params);
    return `${base}${pathPart}${q ? `?${q}` : ''}`;
  }
}
