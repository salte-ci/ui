import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { KEY_ESCAPE } from 'keycode-js';
import * as Window from '../../utils/window';

import { Card } from '../Card';
import * as Events from '../../utils/events';

import styles from './index.css';
import { OPENED, OPENING, CLOSING, CLOSED } from './constants';

export function Modal({
  component: Component,
  onClose,
  onCancel,
  onClick,
  props,
  variant,
  ...extraProps
}) {
  const backdrop = useRef();
  const [status, setStatus] = useState(CLOSED);

  const animate = (initialStatus, finalStatus) => {
    setStatus(initialStatus);

    return Events.once(
      backdrop.current,
      'transitionend',
      { passive: true },
      Events.currentTargetPredicate,
    ).then(() => {
      setStatus(finalStatus);
    });
  };

  const close = (result) =>
    animate(CLOSING, CLOSED).then(() => onClose(result));
  const cancel = (reason) =>
    animate(CLOSING, CLOSED).then(() => onCancel(reason));

  useEffect(() => {
    animate(OPENING, OPENED);
  }, []);

  useEffect(() => {
    const OnKeyDown = (e) => {
      if (![KEY_ESCAPE].includes(e.keyCode)) return;

      cancel();
    };

    Window.addEventListener('keydown', OnKeyDown);

    return () => {
      Window.removeEventListener('keydown', OnKeyDown);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      {...extraProps}
      tid="backdrop"
      className={styles.backdrop}
      ref={backdrop}
      status={status}
      onClick={(e) => {
        if (e.target.dataset.cancel || e.target === backdrop.current) {
          cancel();
        } else if (e.target.dataset.close) {
          close();
        }

        if (onClick) onClick(e);
      }}
    >
      <Card className={styles.modal} role="dialog" variant={variant.toString()}>
        <Component {...props} close={close} cancel={cancel} />
      </Card>
    </div>
  );
}

Modal.propTypes = {
  component: PropTypes.elementType.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  props: PropTypes.object,
  variant: PropTypes.oneOf(['small', 'medium', 'large']),
};

Modal.defaultProps = {
  variant: 'medium',
};
