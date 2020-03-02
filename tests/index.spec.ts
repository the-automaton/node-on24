/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */
import sinon from 'sinon';
import On24 from '../dist/index';

const mockCreds: any = {
  clientId: 123,
  tokenKey: 'some-token-key',
  tokenSecret: 'some-token-secret',
};

const expectedBase = `https://api.on24.com/v2/client/${mockCreds.clientId}`;
let mockNeedle: any;


describe('client-base', () => {
  const expectedHeaders = {
    headers: {
      accessTokenKey: mockCreds.tokenKey,
      accessTokenSecret: mockCreds.tokenSecret,
    },
  }

  beforeEach(() => {
    mockNeedle = {
      get: sinon.stub(),
      post: sinon.stub(),
      patch: sinon.stub(),
    };
  });

  describe('get', () => {

    test('applies credentials as expected', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond.
      mockNeedle.get.callsArgWith(2, null, {}, {});

      // Expect the mock to have been called with the expected access headers.
      await client.analytics.listEvents();
      sinon.assert.calledWith(mockNeedle.get, sinon.match.any, expectedHeaders);
      done();
    });

    test('applies params as expected', async (done) => {
      const client = new On24(mockCreds, mockNeedle);
      const expectedTz = 'America/Los_Angeles';
      const expectedDFM = 'creation';

      // Program the needle mock to respond.
      mockNeedle.get.callsArgWith(2, null, {}, {});

      // Expect the mock to have been called with the expected query parameters.
      await client.analytics.listEvents({dateIntervalTimezone: expectedTz, dateFilterMode: expectedDFM});
      sinon.assert.calledWith(
        mockNeedle.get,
        sinon.match(`?dateIntervalTimezone=${encodeURIComponent(expectedTz)}&dateFilterMode=${encodeURIComponent(expectedDFM)}`),
      );
      done();
    });

    test('can use custom base url', async (done) => {
      // Set up client with alternate baseUrl.
      mockCreds.baseUrl = 'https://test-api.on24.com';
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond.
      mockNeedle.get.callsArgWith(2, null, {}, {});

      // Expect the mock to have been called with an alternate base URL.
      await client.analytics.listEvents();
      sinon.assert.calledWith(mockNeedle.get, sinon.match(mockCreds.baseUrl));
      done();
    });

    test('throws needle error', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond with an error.
      const expectedErr = 'some-needle-err';
      mockNeedle.get.callsArgWith(2, expectedErr);

      try {
        await client.analytics.listEvents()
      } catch (e) {
        expect(e).toBe(expectedErr);
        done();
      }
    });

    test('throws api error', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond with an API error.
      const expectedApiErrBody = 'some-api-err';
      const expectedApiErrRes = {statusCode: 400};
      mockNeedle.get.callsArgWith(2, null, expectedApiErrRes, expectedApiErrBody);

      try {
        await client.analytics.listEvents()
      } catch (e) {
        expect(e.response).toBe(expectedApiErrRes);
        expect(e.body).toBe(expectedApiErrBody);
        done();
      }
    });

    test('does not throw api error on 404', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond.
      const expectedApiErrRes = {statusCode: 404};
      mockNeedle.get.callsArgWith(2, null, expectedApiErrRes, {});

      // Expect the mock to have been called with the expected access headers.
      await client.analytics.listEvents();
      sinon.assert.calledWith(mockNeedle.get, sinon.match.any);
      done();
    });

  });

  describe('post', () => {

    test('applies credentials as expected', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond.
      mockNeedle.post.callsArgWith(3, null, {}, {});

      // Expect the mock to have been called with the expected access headers.
      await client.registration.createRegistrant(123, {});
      sinon.assert.calledWith(mockNeedle.post, sinon.match.any, sinon.match.any, expectedHeaders);
      done();
    });

    test('applies data as expected', async (done) => {
      const client = new On24(mockCreds, mockNeedle);
      const expectedBody = {
        email: 'test@example.com',
        firstname: 'Test',
      }

      // Program the needle mock to respond.
      mockNeedle.post.callsArgWith(3, null, {}, {});

      // Expect the mock to have been called with the expected body data.
      await client.registration.createRegistrant(123, expectedBody);
      sinon.assert.calledWith(mockNeedle.post, sinon.match.string, expectedBody);
      done();
    });

    test('can use custom base url', async (done) => {
      // Set up client with alternate baseUrl.
      mockCreds.baseUrl = 'https://test-api.on24.com';
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond.
      mockNeedle.post.callsArgWith(3, null, {}, {});

      // Expect the mock to have been called with an alternate base URL.
      await client.registration.createRegistrant(123, {});
      sinon.assert.calledWith(mockNeedle.post, sinon.match(mockCreds.baseUrl));
      done();
    });

    test('throws needle error', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond with an error.
      const expectedErr = 'some-needle-err';
      mockNeedle.post.callsArgWith(3, expectedErr, {}, {});

      try {
        await client.registration.createRegistrant(123, {});
      } catch (e) {
        expect(e).toBe(expectedErr);
        done();
      }
    });

    test('throws api error', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond with an API error.
      const expectedApiErrBody = 'some-api-err';
      const expectedApiErrRes = {statusCode: 400, statusMessage: 'Bad request.'};
      mockNeedle.post.callsArgWith(3, null, expectedApiErrRes, expectedApiErrBody);

      try {
        await client.registration.createRegistrant(123, {});
      } catch (e) {
        expect(e.response).toBe(expectedApiErrRes);
        expect(e.body).toBe(expectedApiErrBody);
        expect(e.toString()).toContain(expectedApiErrRes.statusMessage);
        done();
      }
    });

  });

  describe('patch', () => {

    test('applies credentials as expected', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond.
      mockNeedle.patch.callsArgWith(3, null, {}, {});

      // Expect the mock to have been called with the expected access headers.
      await client.registration.updateRegistrant('test@example.com', {});
      sinon.assert.calledWith(mockNeedle.patch, sinon.match.any, sinon.match.any, expectedHeaders);
      done();
    });

    test('applies data as expected', async (done) => {
      const client = new On24(mockCreds, mockNeedle);
      const expectedBody = {
        email: 'test@example.com',
        firstname: 'UpdatedTest',
      }

      // Program the needle mock to respond.
      mockNeedle.patch.callsArgWith(3, null, {}, {});

      // Expect the mock to have been called with the expected body data.
      await client.registration.updateRegistrant(expectedBody.email, expectedBody);
      sinon.assert.calledWith(mockNeedle.patch, sinon.match.string, expectedBody);
      done();
    });

    test('can use custom base url', async (done) => {
      // Set up client with alternate baseUrl.
      mockCreds.baseUrl = 'https://test-api.on24.com';
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond.
      mockNeedle.patch.callsArgWith(3, null, {}, {});

      // Expect the mock to have been called with an alternate base URL.
      await client.registration.updateRegistrant('test@example.com', {});
      sinon.assert.calledWith(mockNeedle.patch, sinon.match(mockCreds.baseUrl));
      done();
    });

    test('throws needle error', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond with an error.
      const expectedErr = 'some-needle-err';
      mockNeedle.patch.callsArgWith(3, expectedErr, {}, {});

      try {
        await client.registration.updateRegistrant('test@example.com', {});
      } catch (e) {
        expect(e).toBe(expectedErr);
        done();
      }
    });

    test('throws api error', async (done) => {
      const client = new On24(mockCreds, mockNeedle);

      // Program the needle mock to respond with an API error.
      const expectedApiErrBody = {message: 'some-error-message'};
      const expectedApiErrRes = {statusCode: 400};
      mockNeedle.patch.callsArgWith(3, null, expectedApiErrRes, expectedApiErrBody);

      try {
        await client.registration.updateRegistrant('test@example.com', {});
      } catch (e) {
        expect(e.response).toBe(expectedApiErrRes);
        expect(e.body).toBe(expectedApiErrBody);
        expect(e.toString()).toContain(expectedApiErrBody.message);
        done();
      }
    });

  });

  afterEach(() => {
    delete mockCreds.baseUrl;
  })

});

describe('analytics', () => {

  beforeEach(() => {
    mockNeedle = {
      get: sinon.stub(),
    };
  });

  test('lists events', async (done) => {
    const client = new On24(mockCreds, mockNeedle);

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.get.callsArgWith(2, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.analytics.listEvents()).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(mockNeedle.get, `${expectedBase}/event`);
    done();
  });

  test('lists event registrants', async (done) => {
    const client = new On24(mockCreds, mockNeedle);
    const expectedEvent = 999;

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.get.callsArgWith(2, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.analytics.listEventRegistrants(expectedEvent)).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(mockNeedle.get, `${expectedBase}/event/${expectedEvent}/registrant`);
    done();
  });
  
});

describe('event-management', () => {

  beforeEach(() => {
    mockNeedle = {
      get: sinon.stub(),
    };
  });

  test('gets event registrantion fields', async (done) => {
    const client = new On24(mockCreds, mockNeedle);
    const expectedEvent = 999;

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.get.callsArgWith(2, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.eventManagement.getEventRegistrationFields(expectedEvent)).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(mockNeedle.get, `${expectedBase}/event/${expectedEvent}/regfield`);
    done();
  });
  
});

describe('registration', () => {

  beforeEach(() => {
    mockNeedle = {
      get: sinon.stub(),
      post: sinon.stub(),
      patch: sinon.stub(),
    };
  });

  test('creates registrant', async (done) => {
    const client = new On24(mockCreds, mockNeedle);
    const expectedEvent = 999;
    const expectedRegistrant = {email: 'test@example.com'};

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.post.callsArgWith(3, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.registration.createRegistrant(expectedEvent, expectedRegistrant)).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(
      mockNeedle.post,
      `${expectedBase}/event/${expectedEvent}/registrant`,
      expectedRegistrant,
    );
    done();
  });
  
  test('updates registrant', async (done) => {
    const client = new On24(mockCreds, mockNeedle);
    const expectedRegistrant = {
      email: 'test@example.com',
      firstname: 'Test',
    };

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.patch.callsArgWith(3, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.registration.updateRegistrant(expectedRegistrant.email, expectedRegistrant)).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(
      mockNeedle.patch,
      `${expectedBase}/registrant/${encodeURIComponent(expectedRegistrant.email)}`,
      expectedRegistrant,
    );
    done();
  });

  test('soft deletes registrant', async (done) => {
    const client = new On24(mockCreds, mockNeedle);
    const expectedEvent = 999;
    const expectedEmail = 'test@example.com';

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.post.callsArgWith(3, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.registration.softDeleteRegistrant(expectedEvent, expectedEmail)).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(
      mockNeedle.post,
      `${expectedBase}/event/${expectedEvent}/registrant`,
      {
        isDeleted: 'Y',
        email: expectedEmail,
      },
    );
    done();
  });
  
  test('forgets registrant', async (done) => {
    const client = new On24(mockCreds, mockNeedle);
    const expectedEmail = 'test@example.com';

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.post.callsArgWith(3, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.registration.forgetRegistrant(expectedEmail)).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(
      mockNeedle.post,
      `${expectedBase}/forget`,
      {email: expectedEmail},
    );
    done();
  });
  
  test('forgets registrant for specific event', async (done) => {
    const client = new On24(mockCreds, mockNeedle);
    const expectedEvent = 999;
    const expectedEmail = 'test@example.com';

    // Program the needle mock to respond with a body.
    const expectedBody = 'some-response-body';
    mockNeedle.post.callsArgWith(3, null, {}, expectedBody);

    // Expect the body to be resolved.
    expect(await client.registration.forgetRegistrant(expectedEmail, expectedEvent)).toBe(expectedBody);

    // Expect the mock to have been called with the expected arguments.
    sinon.assert.calledWith(
      mockNeedle.post,
      `${expectedBase}/forget`,
      {
        email: expectedEmail,
        eventid: expectedEvent,
      },
    );
    done();
  });
  
});
