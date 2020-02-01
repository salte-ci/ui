import { act } from 'react-dom/test-utils';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import { Accordion } from '..';
import { chance } from '../../../utils/test/mock';
import { WaitForPromises } from '../../../utils/test/wait';
import * as Render from '../../../utils/render';
import * as Events from '../../../utils/events';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Accordion />', () => {
  const Fixture = FixtureFactory({
    component: Accordion,
    props: () => ({
      children: chance.string(),
    }),
  });

  beforeEach(() => {
    sinon.stub(Render, 'OnNextRender').resolves();
    sinon.stub(Events, 'once').resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('prop(opened)', () => {
    it('should render if it is opened', () => {
      const component = Fixture({
        props: {
          opened: true,
        },
      });

      expect(component.children().length).equals(1);
    });

    it('should not render if it is closed', () => {
      const component = Fixture({
        props: {
          opened: false,
        },
      });

      expect(component.children().length).equals(0);
    });

    it('should animate opened from a closed state', async () => {
      const component = Fixture({
        props: {
          opened: false,
        },
      });

      await act(async () =>
        component.setProps({
          opened: true,
        }),
      );

      expect(component.children().length).equals(1);
      sinon.assert.notCalled(Render.OnNextRender);
      sinon.assert.calledOnce(Events.once);
    });

    it('should animate closed from a opened state', async () => {
      const component = Fixture({
        props: {
          opened: true,
        },
      });

      await act(async () =>
        component.setProps({
          opened: false,
        }),
      );

      await WaitForPromises();

      expect(component.children().length).equals(1);
      sinon.assert.calledOnce(Render.OnNextRender);
      sinon.assert.calledOnce(Events.once);
    });
  });
});
