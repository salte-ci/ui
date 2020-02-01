import { expect } from '@hapi/code';
import sinon from 'sinon';

import { Fetch, FetchError } from '..';
import { chance } from '../../test/mock';
import * as Window from '../../window';
import { config } from '../../../config';

describe('Utils(Fetch)', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('class(FetchError)', () => {
    it('should support providing a code, message, and status', () => {
      const error = new FetchError({
        code: 'not_found',
        message: 'Not Found',
        status: 404,
      });

      expect(error.code).equals('not_found');
      expect(error.message).equals('Not Found');
      expect(error.status).equals(404);
    });

    it('should default code to internal_server_error', () => {
      const error = new FetchError({
        message: 'Not Found',
      });

      expect(error.code).equals('internal_server_error');
    });

    it('should default status to 500', () => {
      const error = new FetchError({
        message: 'Not Found',
      });

      expect(error.status).equals(500);
    });
  });

  describe('func(Fetch)', () => {
    it('should default the Content-Type and support automatically parsing json', async () => {
      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns('application/json'),
        },
        json: sinon.stub().resolves('json'),
        ok: true,
      });

      const url = chance.url();

      await Fetch(url);

      sinon.assert.calledOnce(Window.fetch);
      sinon.assert.calledWithExactly(Window.fetch, url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should automatically parsing json', async () => {
      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns('application/json'),
        },
        json: sinon.stub().resolves('json'),
        ok: true,
      });

      const response = await Fetch(chance.url());

      expect(response).equals('json');
    });

    it('should fallback to text', async () => {
      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns(null),
        },
        text: sinon.stub().resolves('text'),
        ok: true,
      });

      const response = await Fetch(chance.url());

      expect(response).equals('text');
    });

    it('should support overriding the Content-Type', async () => {
      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns('application/json'),
        },
        json: sinon.stub().resolves(),
        ok: true,
      });

      const url = chance.url();

      await Fetch(url, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });

      sinon.assert.calledOnce(Window.fetch);
      sinon.assert.calledWithExactly(Window.fetch, url, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    });

    it('should support providing other options', async () => {
      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns('application/json'),
        },
        json: sinon.stub().resolves(),
        ok: true,
      });

      const url = chance.url();

      await Fetch(url, {
        headers: {
          Accept: 'application/json',
        },
        method: 'post',
      });

      sinon.assert.calledOnce(Window.fetch);
      sinon.assert.calledWithExactly(Window.fetch, url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
      });
    });

    it('should support failing requests', async () => {
      const expectedError = chance.string();

      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns('application/json'),
        },
        json: sinon.stub().resolves(new Error(expectedError)),
        ok: false,
      });

      const url = chance.url();

      await expect(Fetch(url)).rejects(Error, expectedError);
    });

    it('should throw a specific error if the server is likely down.', async () => {
      const expectedError = 'failed to fetch';

      sinon.stub(Window, 'fetch').rejects(new Error(expectedError));

      const url = chance.url();

      await expect(Fetch(url)).rejects(
        FetchError,
        `Error while attempting to call the server, server may be down.`,
      );
    });

    it('should automatically wrap failures that are not an Error in a FetchError', async () => {
      const expectedMessage = chance.string();

      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns('application/json'),
        },
        json: sinon.stub().resolves({
          message: expectedMessage,
        }),
        ok: false,
      });

      const url = chance.url();

      await expect(Fetch(url)).rejects(FetchError, expectedMessage);
    });

    it('should route /api requests automatically', async () => {
      const API_URL = chance.string();
      sinon.stub(config, 'url').get(() => API_URL);

      sinon.stub(Window, 'fetch').resolves({
        headers: {
          get: sinon
            .stub()
            .withArgs('Content-Type')
            .returns('application/json'),
        },
        json: sinon.stub().resolves(),
        ok: true,
      });

      const url = `/api/${chance.string()}`;

      await Fetch(url);

      sinon.assert.calledOnce(Window.fetch);
      sinon.assert.calledWith(Window.fetch, url.replace(/^\/api/, API_URL));
    });
  });
});
