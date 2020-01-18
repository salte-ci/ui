import React from 'react';
import ReactDOM from 'react-dom';

import { Card } from '../Card';

import styles from './index.css';

const container = document.createElement('div');
container.id = 'modal-container';
document.body.appendChild(container);

// TODO: Implement Show and Hide animations
// TODO: Add a way of providing a result / reason from the children.

export class Modal extends React.Component {
  constructor(props) {
    super(props);

    if (Modal.instance) {
      throw new Error('The modal container is already defined');
    }

    Modal.instance = this;

    this.state = {
      modals: [],
    };
  }

  static open(props) {
    return Modal.instance.add(props);
  }

  identifier(props) {
    return btoa(JSON.stringify(props));
  }

  add(props = {}) {
    const identifier = this.identifier(props);

    const index = this.find(identifier);

    if (index !== -1) return Promise.reject(new Error('Already exists...'));

    return new Promise((resolve, reject) => {
      this.setState((prevState) => ({
        modals: [
          ...prevState.modals,
          { ...props, resolve, reject, identifier },
        ],
      }));
    });
  }

  close(identifier, result) {
    const index = this.find(identifier);

    if (index === -1) return;

    const { resolve } = this.state.modals[index];
    this.remove(index);

    resolve(result);
  }

  cancel(identifier, reason) {
    const index = this.find(identifier);

    if (index === -1) return;

    const { reject } = this.state.modals[index];
    this.remove(index);

    reject(
      reason || new Error('Modal was closed or no error message was provided.'),
    );
  }

  remove(index) {
    this.setState((prevState) => {
      prevState.modals.splice(index, 1);
      return { modals: prevState.modals };
    });
  }

  find(identifier) {
    return this.state.modals.findIndex(
      (modal) => modal.identifier === identifier,
    );
  }

  render() {
    return (
      <>
        {this.state.modals.map(
          ({
            resolve,
            reject,
            children,
            identifier,
            variant = 'medium',
            ...extraProps
          }) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              {...extraProps}
              id="backdrop"
              key={identifier}
              onClick={(event) => {
                if (
                  event.target.dataset.cancel ||
                  event.target === event.currentTarget
                ) {
                  this.cancel(identifier);
                } else if (event.target.dataset.close) {
                  this.close(identifier);
                }
              }}
              className={styles.backdrop}
            >
              <Card className={styles.modal} variant={variant.toString()}>
                {children}
              </Card>
            </div>
          ),
        )}
      </>
    );
  }
}

ReactDOM.render(<Modal />, container);
