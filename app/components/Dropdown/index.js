import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';

import styles from './index.css';
import * as WindowUtils from '../../utils/window';

export function Dropdown({ alignment, buffer, children, toggle, ...extraProps }) {
  const toggleRef = useRef();
  const dropdownRef = useRef();
  const [style, setStyle] = useState(null);
  const [opened, setOpened] = useState(false);
  const close = () => setOpened(false);
  const toggleOpened = () => setOpened(!opened);

  useEffect(() => {
    const onGlobalClick = e => {
      if (e.path.includes(dropdownRef.current)) return;

      setOpened(false);
    };

    const reposition = () => {
      const { left: x, top: y, width, height } = toggleRef.current.getBoundingClientRect();

      let left = x;

      if (alignment === 'right') {
        left += width - dropdownRef.current.clientWidth;
      } else if (alignment === 'center') {
        left += width / 2 - dropdownRef.current.clientWidth / 2;
      }

      left = Math.min(WindowUtils.innerWidth() - dropdownRef.current.clientWidth - buffer, left);
      left = Math.max(buffer, left);

      setStyle({
        left,
        top: y + height + buffer,
      });
    };

    if (opened) {
      WindowUtils.addEventListener('click', onGlobalClick);
      WindowUtils.addEventListener('resize', reposition, {
        passive: true,
      });
      WindowUtils.addEventListener('scroll', reposition, {
        passive: true,
      });
      reposition();
    }

    return () => {
      WindowUtils.removeEventListener('click', onGlobalClick);
      WindowUtils.removeEventListener('resize', reposition);
      WindowUtils.removeEventListener('scroll', reposition);
    };
  }, [opened]);

  return (
    <div {...extraProps} className={styles.menu}>
      <div
        tid="toggle"
        className={styles.toggle}
        ref={toggleRef}
        role="button"
        tabIndex="0"
        onClick={toggleOpened}
        onKeyDown={toggleOpened}>
        {typeof toggle === 'string' ? (
          <Button className={styles.toggle} theme="secondary">
            {toggle}
          </Button>
        ) : (
          toggle
        )}
      </div>
      <div
        tid="dropdown"
        className={styles.dropdown}
        direction="column"
        opened={opened.toString()}
        role="button"
        spacing={0}
        onClick={close}
        onKeyDown={close}
        tabIndex="0"
        ref={dropdownRef}
        style={style}>
        {children}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  buffer: PropTypes.number,
  children: PropTypes.node,
  toggle: PropTypes.node.isRequired,
};

Dropdown.defaultProps = {
  alignment: 'left',
  buffer: 10,
};

function Item({ children, type: Type, ...extraProps }) {
  return (
    <Type {...extraProps} className={styles.item}>
      {children}
    </Type>
  );
}

Item.propTypes = {
  children: PropTypes.node,
  type: PropTypes.elementType,
};

Item.defaultProps = {
  type: 'div',
};

Dropdown.Item = Item;
