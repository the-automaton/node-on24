
export class ApiError extends Error {

  constructor(public response: any, public body: any) {
    super(body && body.message ? body.message : response.statusMessage);
  }

};
