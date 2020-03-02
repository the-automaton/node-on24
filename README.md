# node-on24

A node.js API client for the On24 Webinar Engagement platform.

![](https://github.com/the-automaton/node-on24/workflows/Build/badge.svg) [![](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

The organization of this API client mimics the way On24 conceives of its API in
its documentation (for better or for worse). If you're wondering where those
docs are, they are here: https://apidoc.on24.com/

The implementation of the API is incomplete, but we welcome pull requests with
open arms. Please refer to `CONTRIBUTING.md` for details.

## Installation

Requires Node >=8.

From npm,

```sh-session
$ npm i node-on24
```

Type definitions are bundled with this package.

## Usage

```typescript
import On24 from 'node-on24';

// Instantiate an On24 API client like this.
// You'll probably want to provide API Token/Secret via process.env variables.
const client = new On24({
  clientId: 12345,
  tokenKey: '1a2b3cetc',
  tokenSecret: '',
});
```

### Examples

Responses and inputs are typehinted (if you are using Typescript), but you can
always refer to the API documentation for details: https://apidoc.on24.com/

All examples below use `async/await`, though as with any Promise-based API
client, you can use them like standard Promises as well.

**Registration**

```typescript
let response;
const registrant = {
  email: 'test@example.com';
  firstname: 'Test',
  lastname: 'User',
};

// Create a registrant for a specific event.
response = await client.registration.createRegistrant(eventId, registrant);

// Update an existing registrant (across all events).
response = await client.registration.updateRegistrant('test@example.com', registrant);

// Soft delete a registrant for a specific event.
response = await client.registration.softDeleteRegistrant(eventId, 'test@example.com');

// Forget a registrant (optionally just for a specific event).
response = await client.registration.forgetRegistrant('test@example.com', eventId);
response = await client.registration.forgetRegistrant('test@example.com');
```

**Event Management**

```typescript
let response;

// Retrieve registration fields for an event.
response = await client.eventManagement.getEventRegistrationFields(eventId);
```

**Analytics**

```typescript
let response;

// Retrieve a list of events (check API docs for default filter values)
response = await client.analytics.listEvents({startDate: '2020-01-01'});

// Retrieve a list of event registrants.
response = await client.analytics.listEventRegistrants(eventId, {partnerref: 'someco'});
```

**Error Handling**

```typescript
// API errors can be caught like this.
try {
  await client.analytics.listEvents({startDate: '2020-01-01'});
} catch (e) {
  if (e.response && e.response.statusCode) {
    console.error(e.response.statusCode); // e.g. 400, 401, etc.
    console.error(e.body); // The response body, which may contain a message.
  }
}
```

## Contributing

Pull requests and issues are welcome!  See `CONTRIBUTING.md` for details.
