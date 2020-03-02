import * as needle from 'needle';
import { Analytics } from './apis/analytics';
import { EventManagement } from './apis/event-management';
import { Registration } from './apis/registration';

export interface ClientCredentials {
  clientId: number;
  tokenKey: string;
  tokenSecret: string;
  baseUrl?: string;
}

export default class On24 {
  public analytics: Analytics;
  public eventManagement: EventManagement;
  public registration: Registration;

  constructor(credentials: ClientCredentials, reqLib = needle) {
    this.analytics = new Analytics(credentials, reqLib);
    this.eventManagement = new EventManagement(credentials, reqLib);
    this.registration = new Registration(credentials, reqLib);
  }
}
