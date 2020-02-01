import { expect } from '@hapi/code';
import { FixtureFactory } from '../../../utils/test/mount';
import { ErrorState } from '..';
import { chance } from '../../../utils/test/mock';

describe('<ErrorState />', () => {
  const Fixture = FixtureFactory({
    component: ErrorState,
    props: () => ({
      children: chance.string(),
    }),
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.text()).equals(children);
    });
  });

  describe('prop(errors)', () => {
    it('should display the error if an error is provided', () => {
      const children = chance.string();
      const error = new Error('Whoops!');

      const component = Fixture({
        props: {
          children,
          errors: error,
        },
      });

      expect(component.exists('Grid#error')).equals(true);
      expect(component.text()).not.contains(children);
    });

    it('should display a header and message if provided', () => {
      const error = {
        header: chance.string(),
        message: chance.string(),
      };

      const component = Fixture({
        props: {
          errors: error,
        },
      });

      expect(component.find('H2#header').text()).equals(error.header);
      expect(component.find('#message').text()).equals(error.message);
    });

    it('should default the header and message', () => {
      const component = Fixture({
        props: {
          errors: {},
        },
      });

      expect(component.find('H2#header').text()).equals(
        'Internal Server Error',
      );
      expect(component.find('#message').text()).equals('Internal Server Error');
    });

    it('should display the content if no error is provided', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
          errors: undefined,
        },
      });

      expect(component.text()).contains(children);
      expect(component.exists('Grid#error')).equals(false);
    });

    it('should support providing an array of errors', () => {
      const errors = [new Error('Whoops!')];

      const children = chance.string();
      const component = Fixture({
        props: {
          children,
          errors,
        },
      });

      expect(component.exists('Grid#error')).equals(true);
      expect(component.text()).not.contains(children);
    });

    it('should support providing an array with all null values', () => {
      const errors = [null, null];

      const children = chance.string();
      const component = Fixture({
        props: {
          children,
          errors,
        },
      });

      expect(component.text()).contains(children);
      expect(component.exists('Grid#error')).equals(false);
    });

    it('should support providing an empty array', () => {
      const errors = [];

      const children = chance.string();
      const component = Fixture({
        props: {
          children,
          errors,
        },
      });

      expect(component.text()).contains(children);
      expect(component.exists('Grid#error')).equals(false);
    });
  });
});
