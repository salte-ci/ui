import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.matchMedia = () => ({
  addEventListener: sinon.stub(),
  removeEventListener: sinon.stub(),
  matches: true,
});
