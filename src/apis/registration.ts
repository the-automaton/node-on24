import { ClientBase } from '../client-base';
import { ClientCredentials } from '..';
import { Registrant, UpdateRegistrantResult, ForgetRegistrantResult } from '../interfaces';

export class Registration extends ClientBase {

  constructor(credentials: ClientCredentials, reqLib: any) {
    super(credentials, reqLib);
  }

  public createRegistrant(eventId: number, registrantData: Registrant): Promise<Registrant> {
    return this.post(`/event/${eventId}/registrant`, registrantData);
  }

  public updateRegistrant(email: string, registrantData: Registrant): Promise<UpdateRegistrantResult> {
    return this.patch(`/registrant/${encodeURIComponent(email)}`, registrantData);
  }

  public softDeleteRegistrant(eventId: number, email: string): Promise<Registrant> {
    return this.post(`/event/${eventId}/registrant`, {
      isDeleted: 'Y',
      email: email,
    });
  }

  public forgetRegistrant(email: string, eventId?: number): Promise<ForgetRegistrantResult> {
    return this.post(`/forget`, {
      email: email,
      ...(eventId && {eventid: eventId}),
    });
  }

}
