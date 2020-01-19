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

      let resolve;
      sinon.stub(ModalComponents, 'Modal').callsFake(({ onClose }) => {
        resolve = onClose;
        return null;
      });

      const promise = modal({
        component: () => <div />,
      });

      resolve(expectedResult);

      const result = await promise;

      expect(result).equals(expectedResult);
      sinon.assert.calledOnce(ReactDOM.unmountComponentAtNode);
    });

    it('should forward the reject function to onCancel of Modal', async () => {
      const expectedResult = chance.string();

      let reject;
      sinon.stub(ModalComponents, 'Modal').callsFake(({ onCancel }) => {
        reject = onCancel;
        return null;
      });

      const promise = modal({
        component: () => <div />,
      });

      reject(new Error(expectedResult));

      await expect(promise).rejects(Error, expectedResult);
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
