import React from 'react';
import ReactDOM from 'react-dom';

import { Modal } from '../../components/Modal';

export async function modal(options) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  try {
    return await new Promise((resolve, reject) => {
      ReactDOM.render(
        <Modal {...options} onClose={resolve} onCancel={reject} />,
        container,
      );
    });
  } finally {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }
}
