import sinon from 'sinon';

import * as WindowUtils from '../../window';
import { OnNextRender } from '../index';
describe('RenderUtils', () => {
  describe('func(OnNextRender)', () => {
    it('should invoke the callback on the next frame', () => {
      sinon.stub(WindowUtils, 'requestAnimationFrame').callsFake(callback => callback());
      sinon.stub(WindowUtils, 'setTimeout').callsFake(callback => callback());

      const callback = sinon.stub();

      OnNextRender(callback);

      sinon.assert.calledOnce(WindowUtils.requestAnimationFrame);
      sinon.assert.calledOnce(WindowUtils.setTimeout);
      sinon.assert.calledOnce(callback);
    });
  });
});
