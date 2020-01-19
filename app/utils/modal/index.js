import React from 'react';
import ReactDOM from 'react-dom';

import { Modal } from '../../components/Modal';

/**
 * @typedef Options
 * @property {PropTypes.ReactComponentLike} component The modal content component.
 * @property {('small'|'medium'|'large')} variant The modal size variant.
 * @property {Object} props The properties to forward to the content component.
 */

/**
 * @typedef Response
 * @property {any} result The result of the modal being closed successfully.
 * @property {any} reason The reason the modal was canceled.
 * @property {boolean} canceled Whether the modal was canceled or not.
 */

/**
 * Creates a modal tha resolves when it's closed.
 * @param {Options} options the modal options.
 * @returns {Promise<Response>} the result of the modal being closed / canceled.
 */
export async function modal(options) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  try {
    return await new Promise((resolve) => {
      ReactDOM.render(
        <Modal
          {...options}
          onClose={(result) => {
            resolve({
              result,
              canceled: false,
            });
          }}
          onCancel={(reason) => {
            resolve({
              reason,
              canceled: true,
            });
          }}
        />,
        container,
      );
    });
  } finally {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }
}
