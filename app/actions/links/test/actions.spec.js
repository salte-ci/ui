import { expect } from '@hapi/code';
import sinon from 'sinon';

import { AddLink, AddLinks, GetLinks, RemoveLink, ResetLink } from '../actions';
import { chance, MockThunks } from '../../../utils/test/mock';
import { ADD_LINKS, RESET_LINK } from '../constants';
import * as Repository from '../repository';
import { auth } from '../../../auth';
import { LoadingThunk } from '../../../utils/thunk';

describe('Actions(Links)', () => {
  beforeEach(() => {
    MockThunks();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('func(AddLink)', () => {
    it('should add a link to the given provider', async () => {
      const provider = chance.string();
      const code = chance.string();
      const link = chance.string();

      const dispatch = sinon.stub();
      sinon.stub(auth, 'login').resolves();
      sinon.stub(auth, 'provider').returns({ code });
      sinon.stub(Repository, 'AddLink').resolves(link);

      await AddLink(provider)(dispatch);

      sinon.assert.calledWithMatch(
        LoadingThunk,
        `links:${provider}`,
        sinon.match.func,
      );

      sinon.assert.calledOnce(auth.login);
      sinon.assert.calledWithExactly(auth.login, {
        provider,
        handler: 'tab',
      });

      sinon.assert.calledOnce(auth.provider);
      sinon.assert.calledWithExactly(auth.provider, provider);

      sinon.assert.calledOnce(Repository.AddLink);
      sinon.assert.calledWithExactly(Repository.AddLink, provider, code);

      sinon.assert.calledWithExactly(dispatch, AddLinks([link]));
    });
  });

  describe('func(AddLinks)', () => {
    it('should create an action', () => {
      const expectedLinks = [chance.string()];

      expect(AddLinks(expectedLinks)).equals({
        type: ADD_LINKS,
        links: expectedLinks,
      });
    });
  });

  describe('func(GetLinks)', () => {
    it('should fetch the links for the given user and store it in state', async () => {
      const expectedLinks = [chance.string()];

      const dispatch = sinon.stub();
      sinon.stub(Repository, 'GetLinks').resolves(expectedLinks);

      await GetLinks()(dispatch);

      sinon.assert.calledWithMatch(LoadingThunk, 'links', sinon.match.func);

      sinon.assert.calledWithExactly(dispatch, AddLinks([]));
      sinon.assert.calledWithExactly(dispatch, AddLinks(expectedLinks));
    });
  });

  describe('func(RemoveLink)', () => {
    it('should remove any links to the given provider', async () => {
      const providerID = chance.integer();
      const providerName = chance.string();

      const dispatch = sinon.stub();
      sinon.stub(Repository, 'RemoveLink').resolves();

      await RemoveLink(providerID, providerName)(dispatch);

      sinon.assert.calledWithMatch(
        LoadingThunk,
        `links:${providerName}`,
        sinon.match.func,
      );

      sinon.assert.calledWithExactly(dispatch, ResetLink(providerID));
    });
  });

  describe('func(ResetLink)', () => {
    it('should create an action', () => {
      const providerID = chance.integer();

      expect(ResetLink(providerID)).equals({
        type: RESET_LINK,
        provider: providerID,
      });
    });
  });
});
