import sinon from 'sinon';

import * as Window from '../../window';
import { OnNextRender } from '..';

describe('Utils(Render)', () => {
  describe('func(OnNextRender)', () => {
    it('should invoke the callback on the next frame', async () => {
      sinon
        .stub(Window, 'requestAnimationFrame')
        .callsFake((callback) => callback());
      sinon.stub(Window, 'setTimeout').callsFake((callback) => callback());

      await OnNextRender();

      sinon.assert.calledOnce(Window.requestAnimationFrame);
      sinon.assert.calledOnce(Window.setTimeout);
    });
  });
});
