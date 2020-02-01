import { expect } from '@hapi/code';
import { chance } from '../../../utils/test/mock';

import { Body } from '..';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Body />', () => {
  const Fixture = FixtureFactory({
    component: Body,
    props: () => ({
      children: chance.string(),
    }),
  });

  describe('prop(children)', () => {
    it('should support providing content', () => {
      const children = chance.string();

      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.text()).equals(children);
    });
  });

  describe('prop(bold)', () => {
    it('should support bolding the content', () => {
      const component = Fixture({
        props: {
          bold: true,
        },
      });

      expect(component.find('[tid="body"]').prop('bold')).equals('true');
    });

    it('should support the content not being bold', () => {
      const component = Fixture({
        props: {
          bold: false,
        },
      });

      expect(component.find('[tid="body"]').prop('bold')).equals('false');
    });
  });

  describe('prop(type)', () => {
    it('should support providing a custom type', () => {
      const component = Fixture({
        props: {
          type: 'span',
        },
      });

      expect(component.find('[tid="body"]').type()).equals('span');
    });
  });
});
