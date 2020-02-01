import { expect } from '@hapi/code';
import sinon from 'sinon';

import { GetVariable } from '../../../utils/theme';

import { Line } from '../../Line';
import { Toggle } from '..';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Toggle />', () => {
  const Fixture = FixtureFactory({
    component: Toggle,
  });

  describe('prop(checked)', () => {
    it('should support being checked', () => {
      const component = Fixture({
        props: {
          checked: true,
        },
      });

      const { style, checked, 'aria-checked': ariaChecked } = component
        .find('[role="checkbox"]')
        .props();

      const { '--sci-toggle-color': ToggleColor } = style;
      expect(ToggleColor).equals(GetVariable('success'));
      expect(checked).equals(true);
      expect(ariaChecked).equals(true);

      const lines = component.find(Line);
      expect(lines.length).equals(3);

      lines.forEach((line) => {
        expect(line.prop('theme')).equals('success');
      });
    });

    it('should support not being checked', () => {
      const component = Fixture({
        props: {
          checked: false,
        },
      });

      const { style, checked, 'aria-checked': ariaChecked } = component
        .find('[role="checkbox"]')
        .props();

      const { '--sci-toggle-color': ToggleColor } = style;
      expect(ToggleColor).equals(GetVariable('accent'));
      expect(checked).equals(false);
      expect(ariaChecked).equals(false);

      const lines = component.find(Line);
      expect(lines.length).equals(3);

      lines.forEach((line) => {
        expect(line.prop('theme')).equals('accent');
      });
    });
  });

  describe('prop(onClick)', () => {
    it('should forward the "onClick" event', () => {
      const onClick = sinon.stub();

      const component = Fixture({
        props: {
          onClick,
        },
      });

      component.find('[role="checkbox"]').simulate('click');

      sinon.assert.calledOnce(onClick);
    });
  });
});
