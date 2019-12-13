import { expect } from '@hapi/code';
import sinon from 'sinon';

import { Modal } from '../../../components/Modal';

import { modal } from '../index';

describe('ModalUtils', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('function(modal)', () => {
    it('should support successful promises', async () => {
      const response = 'success!';
      sinon.stub(Modal, 'open').resolves(response);

      const result = await modal();

      expect(result).equals(response);
    });

    it('should support failed promises', async () => {
      const response = new Error('failure!');
      sinon.stub(Modal, 'open').rejects(response);

      const result = await modal().catch(e => e);

      expect(result).equals(response);
    });

    it('should support passing properties', async () => {
      const props = {
        hello: 'world',
      };

      sinon.stub(Modal, 'open').resolves('success!');

      await modal(props);

      sinon.assert.calledWithExactly(Modal.open, props);
    });
  });
});
