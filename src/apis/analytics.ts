import { ClientCredentials } from '..';
import { ClientBase } from '../client-base';
import { ListEventParams, ListEventResult, ListEventRegistrantParams, ListEventRegistrantResult } from '../interfaces';

export class Analytics extends ClientBase {

  constructor(credentials: ClientCredentials, reqLib: any) {
    super(credentials, reqLib);
  }

  public async listEvents(params?: ListEventParams): Promise<ListEventResult> {
    return this.get('/event', params);
  }

  public async listEventRegistrants(eventId: number, params?: ListEventRegistrantParams): Promise<ListEventRegistrantResult> {
    return this.get(`/event/${eventId}/registrant`, params);
  }

}
