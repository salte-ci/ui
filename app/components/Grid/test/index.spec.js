import { expect } from '@hapi/code';

import { Grid } from '..';
import { chance } from '../../../utils/test/mock';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Grid />', () => {
  const Fixture = FixtureFactory({
    component: Grid,
  });

  it('should render the component', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });

  describe('prop(children)', () => {
    it('should render children', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.text()).equals(children);
    });
  });

  describe('prop(alignItems)', () => {
    it('should be short-hand for the alignItems style', () => {
      const component = Fixture({
        props: {
          alignItems: 'center',
        },
      });

      expect(
        component.find('[tid="inner-grid"]').prop('style').alignItems,
      ).equals('center');
    });
  });

  describe('prop(justifyContent)', () => {
    it('should be short-hand for the justifyContent style', () => {
      const component = Fixture({
        props: {
          justifyContent: 'center',
        },
      });

      expect(
        component.find('[tid="inner-grid"]').prop('style').justifyContent,
      ).equals('center');
    });
  });

  describe('prop(flex)', () => {
    it('should be short-hand for the flex style', () => {
      const component = Fixture({
        props: {
          flex: 1,
        },
      });

      expect(component.find('#grid').prop('style').flex).equals(1);
    });
  });

  describe('prop(className)', () => {
    it('should be support custom classNames', () => {
      const className = chance.string();
      const component = Fixture({
        props: {
          className,
        },
      });

      expect(component.find('#grid').prop('className')).contains(className);
    });
  });

  describe('prop(direction)', () => {
    it('should support a direction of "row"', () => {
      const component = Fixture({
        props: {
          direction: 'row',
        },
      });

      expect(component.find('#grid').prop('direction')).contains('row');
    });

    it('should support a direction of "column"', () => {
      const component = Fixture({
        props: {
          direction: 'column',
        },
      });

      expect(component.find('#grid').prop('direction')).contains('column');
    });
  });

  describe('prop(style)', () => {
    it('should support a custom style', () => {
      const component = Fixture({
        props: {
          style: { height: 100 },
        },
      });

      expect(component.find('#grid').prop('style')).equals({
        height: 100,
      });
    });
  });

  describe('prop(responsive)', () => {
    it('should support being responsive', () => {
      const component = Fixture({
        props: {
          responsive: true,
        },
      });

      expect(component.find('#grid').prop('responsive')).equals('true');
    });
  });

  describe('prop(spacing)', () => {
    it('should support providing a spacing value', () => {
      const component = Fixture({
        props: {
          spacing: 10,
        },
      });

      const { '--sci-grid-spacing': spacing } = component
        .find('[tid="inner-grid"]')
        .prop('style');

      expect(spacing).equals('10px');
    });

    it('should support custom units', () => {
      const component = Fixture({
        props: {
          spacing: '1em',
        },
      });

      const { '--sci-grid-spacing': spacing } = component
        .find('[tid="inner-grid"]')
        .prop('style');

      expect(spacing).equals('1em');
    });
  });

  describe('prop(type)', () => {
    it('should support custom element types', () => {
      const component = Fixture({
        props: {
          type: 'span',
        },
      });

      expect(component.find('#grid').type()).equals('span');
    });
  });
});
