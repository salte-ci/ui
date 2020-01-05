import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { Grid } from '../index';
import { chance } from '../../../utils/test/mock';

describe('<Grid />', () => {
  it('should render the component', () => {
    const component = mount(<Grid />);

    expect(component.children().length).equals(1);
  });

  describe('prop(children)', () => {
    it('should render children', () => {
      const component = mount(<Grid>Hello World</Grid>);

      expect(component.text()).equals('Hello World');
    });
  });

  describe('prop(alignItems)', () => {
    it('should be short-hand for the alignItems style', () => {
      const component = mount(<Grid alignItems="center" />);

      expect(component.find('#grid').prop('style').alignItems).equals('center');
    });
  });

  describe('prop(justifyContent)', () => {
    it('should be short-hand for the justifyContent style', () => {
      const component = mount(<Grid justifyContent="center" />);

      expect(component.find('#grid').prop('style').justifyContent).equals('center');
    });
  });

  describe('prop(flex)', () => {
    it('should be short-hand for the flex style', () => {
      const component = mount(<Grid flex={1} />);

      expect(component.find('#grid').prop('style').flex).equals(1);
    });
  });

  describe('prop(className)', () => {
    it('should be support custom classNames', () => {
      const className = chance.string();
      const component = mount(<Grid className={className} />);

      expect(component.find('#grid').prop('className')).contains(className);
    });
  });

  describe('prop(direction)', () => {
    it('should support a direction of "row"', () => {
      const component = mount(<Grid direction="row" />);

      expect(component.find('#grid').prop('direction')).contains('row');
    });

    it('should support a direction of "column"', () => {
      const component = mount(<Grid direction="column" />);

      expect(component.find('#grid').prop('direction')).contains('column');
    });
  });

  describe('prop(style)', () => {
    it('should support a custom style', () => {
      const component = mount(<Grid style={{ height: 100 }} />);

      expect(component.find('#grid').prop('style')).equals({
        '--sci-grid-spacing': '20px',
        height: 100,
      });
    });
  });

  describe('prop(responsive)', () => {
    it('should support being responsive', () => {
      const component = mount(<Grid responsive />);

      expect(component.find('#grid').prop('responsive')).equals('true');
    });
  });

  describe('prop(spacing)', () => {
    it('should support providing a spacing value', () => {
      const component = mount(<Grid spacing={10} />);

      const { '--sci-grid-spacing': spacing } = component.find('#grid').prop('style');

      expect(spacing).equals('10px');
    });

    it('should support custom units', () => {
      const component = mount(<Grid spacing="1em" />);

      const { '--sci-grid-spacing': spacing } = component.find('#grid').prop('style');

      expect(spacing).equals('1em');
    });
  });

  describe('prop(type)', () => {
    it('should support custom element types', () => {
      const component = mount(<Grid type="span" />);

      expect(component.find('#grid').type()).equals('span');
    });
  });
});
