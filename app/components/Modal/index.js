import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { KEY_ESCAPE } from 'keycode-js';
import * as Window from '../../utils/window';

import { Card } from '../Card';
import * as Events from '../../utils/events';

import styles from './index.css';
import { noop } from '../../utils/noop';
import { OnNextRender } from '../../utils/render';

const container = document.createElement('div');
document.body.appendChild(container);

export function Modal({
  children,
  opened,
  onClose,
  onCloseFinished,
  onClick,
  onOpenFinished,
  props,
  variant,
  ...extraProps
}) {
  const backdrop = useRef();
  const [visible, setVisible] = useState(opened);

  useEffect(() => {
    if (opened && !visible) {
      OnNextRender().then(() => {
        setVisible(true);

        Events.once(
          backdrop.current,
          'transitionend',
          { passive: true },
          Events.currentTargetPredicate,
        ).then(() => {
          onOpenFinished();
        });
      });
    } else if (!opened && visible) {
      Events.once(
        backdrop.current,
        'transitionend',
        { passive: true },
        Events.currentTargetPredicate,
      ).then(() => {
        setVisible(false);

        onCloseFinished();
      });
    }
  }, [opened]);

  useEffect(() => {
    const OnKeyDown = (e) => {
      if (![KEY_ESCAPE].includes(e.keyCode)) return;

      onClose();
    };

    Window.addEventListener('keydown', OnKeyDown);

    return () => {
      Window.removeEventListener('keydown', OnKeyDown);
    };
  }, []);

  if (!visible && !opened) return null;

  return ReactDOM.createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      {...extraProps}
      tid="backdrop"
      className={styles.backdrop}
      ref={backdrop}
      opened={(opened && visible).toString()}
      onClick={(e) => {
        if (e.target === backdrop.current) onClose();

        if (onClick) onClick(e);
      }}
    >
      <Card
        className={styles.modal}
        role="dialog"
        variant={variant.toString()}
        tid="modal"
      >
        {children}
      </Card>
    </div>,
    container,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCloseFinished: PropTypes.func,
  onClick: PropTypes.func,
  onOpenFinished: PropTypes.func,
  props: PropTypes.object,
  variant: PropTypes.oneOf(['small', 'medium', 'large']),
};

Modal.defaultProps = {
  variant: 'medium',
  onCloseFinished: noop,
  onOpenFinished: noop,
};
