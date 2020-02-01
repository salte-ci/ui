import Syntax from 'react-highlight';
import { expect } from '@hapi/code';
import { Highlight } from '..';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Highlight />', () => {
  const Fixture = FixtureFactory({
    component: Highlight,
    props: () => ({
      language: 'js',
    }),
  });

  it('should support rendering children', () => {
    const code = `const hello = 'world';`;
    const component = Fixture({
      props: {
        children: code,
      },
    });

    expect(component.find(Syntax).text()).equals(code);
  });

  it('should syntax highlight the children', () => {
    const code = `const hello = 'world';`;
    const component = Fixture({
      props: {
        children: code,
      },
    });

    expect(component.find(Syntax).prop('className')).contains('js');
  });
});
