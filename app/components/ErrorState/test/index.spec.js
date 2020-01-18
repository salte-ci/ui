import React from 'react';
import { expect } from '@hapi/code';
import { MountWrapper } from '../../../utils/test/mount';
import { ErrorState } from '../index';
import { chance } from '../../../utils/test/mock';

describe('<ErrorState />', () => {
  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = MountWrapper(
        <ErrorState>
          <div id="content">Hello World</div>
        </ErrorState>,
      );

      expect(component.text()).equals('Hello World');
    });
  });

  describe('prop(error)', () => {
    it('should display the error if an error is provided', () => {
      const error = new Error('Whoops!');

      const component = MountWrapper(
        <ErrorState error={error}>
          <div id="content">Hello World</div>
        </ErrorState>,
      );

      expect(component.exists('Grid#error')).equals(true);
      expect(component.exists('#content')).equals(false);
    });

    it('should display a header and message if provided', () => {
      const error = {
        header: chance.string(),
        message: chance.string(),
      };

      const component = MountWrapper(
        <ErrorState error={error}>
          <div id="content">Hello World</div>
        </ErrorState>,
      );

      expect(component.find('H2#header').text()).equals(error.header);
      expect(component.find('#message').text()).equals(error.message);
    });

    it('should default the header and message', () => {
      const component = MountWrapper(
        <ErrorState error={{}}>
          <div id="content">Hello World</div>
        </ErrorState>,
      );

      expect(component.find('H2#header').text()).equals(
        'Internal Server Error',
      );
      expect(component.find('#message').text()).equals('Internal Server Error');
    });

    it('should display the error if an error is provided', () => {
      const component = MountWrapper(
        <ErrorState>
          <div id="content">Hello World</div>
        </ErrorState>,
      );

      expect(component.exists('#content')).equals(true);
      expect(component.exists('Grid#error')).equals(false);
    });
  });
});
