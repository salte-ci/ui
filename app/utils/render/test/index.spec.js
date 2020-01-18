import sinon from 'sinon';

import * as Window from '../../window';
import { OnNextRender } from '../index';
describe('Utils(Render)', () => {
  describe('func(OnNextRender)', () => {
    it('should invoke the callback on the next frame', () => {
      sinon
        .stub(Window, 'requestAnimationFrame')
        .callsFake((callback) => callback());
      sinon.stub(Window, 'setTimeout').callsFake((callback) => callback());

      const callback = sinon.stub();

      OnNextRender(callback);

      sinon.assert.calledOnce(Window.requestAnimationFrame);
      sinon.assert.calledOnce(Window.setTimeout);
      sinon.assert.calledOnce(callback);
    });
  });
});
