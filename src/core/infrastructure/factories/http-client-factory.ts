import { HttpRepository } from "@core/domain/interfaces/http-repository";

import { CookieStorage } from "../datasources/cookie-storage/cookie-storage";
import { FetchClient } from "../datasources/fetch/fetch";
import { BasicFetchClient } from "../datasources/fetch/fetch-basic";
import { SessionRepositoryImpl } from "../repositories/user-repository";

export enum DataSourceType {
    HTTP = 'http',
    BASIC_HTTP = 'basic_http'
}

export class HttpClientFactory {
    private static instance: HttpClientFactory;
    private baseApiUrl: string;

    private constructor(baseApiUrl: string) {
        this.baseApiUrl = baseApiUrl;
    }

    public static getInstance() : HttpClientFactory {
        if (!HttpClientFactory.instance) {
            HttpClientFactory.instance = new HttpClientFactory(process.env.API_BASE_URL || 'https://demos.booksandbooksdigital.com.co/content-manager/back/api');
        }
        return HttpClientFactory.instance;
    }

     public async createHttpClient<T = any>(type: DataSourceType = DataSourceType.HTTP): Promise<HttpRepository<T>> {
    switch (type) {
      case DataSourceType.HTTP: {
        const sessionRespository = new SessionRepositoryImpl(new CookieStorage());
        return new FetchClient<T>(this.baseApiUrl, sessionRespository);
      }

      case DataSourceType.BASIC_HTTP: {
        return new BasicFetchClient<T>(this.baseApiUrl);
      }

      default:
        throw new Error(`Unsupported data source type: ${type}`);
    }
  }
}