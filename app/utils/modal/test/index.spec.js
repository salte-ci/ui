import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from '@hapi/code';
import sinon from 'sinon';

import * as ModalComponents from '../../../components/Modal';

import { modal } from '../index';
import { chance } from '../../test/mock';

describe('Utils(Modal)', () => {
  beforeEach(() => {
    sinon.spy(ReactDOM, 'unmountComponentAtNode');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('function(modal)', () => {
    it('should forward the resolve function to onClose of Modal', async () => {
      const expectedResult = chance.string();

      let close;
      sinon.stub(ModalComponents, 'Modal').callsFake(({ onClose }) => {
        close = onClose;
        return null;
      });

      const promise = modal({
        component: () => <div />,
      });

      close(expectedResult);

      const response = await promise;

      expect(response).equals({
        result: expectedResult,
        canceled: false,
      });
      sinon.assert.calledOnce(ReactDOM.unmountComponentAtNode);
    });

    it('should onCancel should resolve the promise as canceled', async () => {
      const expectedResult = chance.string();

      let cancel;
      sinon.stub(ModalComponents, 'Modal').callsFake(({ onCancel }) => {
        cancel = onCancel;
        return null;
      });

      const promise = modal({
        component: () => <div />,
      });

      cancel(expectedResult);

      const response = await promise;

      expect(response).equals({
        reason: expectedResult,
        canceled: true,
      });
      sinon.assert.calledOnce(ReactDOM.unmountComponentAtNode);
    });

    it('should forward any options to the modal', async () => {
      const expectedOptions = {
        component: () => <div />,
        [chance.string()]: chance.string(),
      };

      let options;
      sinon
        .stub(ModalComponents, 'Modal')
        .callsFake(({ onCancel, onClose, variant, ...props }) => {
          options = props;
          onClose();
          return null;
        });

      await modal(expectedOptions);
      expect(options).equals(expectedOptions);
    });
  });
});
