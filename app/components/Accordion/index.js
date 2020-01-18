import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import * as Events from '../../utils/events';
import * as Render from '../../utils/render';

export function Accordion({ children, opened }) {
  const accordionRef = useRef();
  const [visible, setVisible] = useState(opened);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (opened && !visible) {
      setVisible(true);
      setMaxHeight(accordionRef.current.scrollHeight);

      Events.once(
        accordionRef.current,
        'transitionend',
        () => {
          setMaxHeight(null);
        },
        {
          passive: true,
        },
      );
    } else if (!opened && visible) {
      setMaxHeight(accordionRef.current.scrollHeight);

      Render.OnNextRender(() => {
        setMaxHeight(0);

        Events.once(
          accordionRef.current,
          'transitionend',
          () => {
            setVisible(false);
          },
          {
            passive: true,
          },
        );
      });
    }
  }, [opened, visible]);

  if (!visible && !opened) return null;

  return (
    <div
      className={styles.accordion}
      ref={accordionRef}
      opened={opened.toString()}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  opened: PropTypes.bool,
};

Accordion.defaultProps = {
  opened: false,
};
