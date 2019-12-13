import ReactDOM from 'react-dom';
import sinon from 'sinon';

describe('Application Setup', () => {
  it('should setup', () => {
    sinon.stub(ReactDOM, 'render');

    require('../app.js'); // eslint-disable-line global-require

    sinon.assert.calledOnce(ReactDOM.render);
  });
});
