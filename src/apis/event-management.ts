import { ClientBase } from '../client-base';
import { ClientCredentials } from '..';
import { GetEventRegistrationFieldsResult } from '../interfaces';

export class EventManagement extends ClientBase {

  constructor(credentials: ClientCredentials, reqLib: any) {
    super(credentials, reqLib);
  }

  getEventRegistrationFields(eventId: number): Promise<GetEventRegistrationFieldsResult> {
    return this.get(`/event/${eventId}/regfield`);
  }

}
