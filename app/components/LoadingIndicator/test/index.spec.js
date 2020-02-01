import { expect } from '@hapi/code';

import { LoadingIndicator } from '..';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<LoadingIndicator />', () => {
  const Fixture = FixtureFactory({
    component: LoadingIndicator,
  });

  it('should set defaults', () => {
    const component = Fixture();

    expect(component.props()).equals({
      loading: true,
      theme: 'primary',
    });
  });

  describe('prop(loading)', () => {
    it('should set the loading attribute to true', () => {
      const component = Fixture({
        props: {
          loading: true,
        },
      });

      expect(component.find('#loading').prop('loading')).equals('true');
    });

    it('should set the loading attribute to false', () => {
      const component = Fixture({
        props: {
          loading: false,
        },
      });

      expect(component.find('#loading').prop('loading')).equals('false');
    });
  });
});
