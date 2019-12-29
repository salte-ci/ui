import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Icon';

import styles from './list-item.css';
import { themes } from '../../utils/theme';

export function ListItem({ children, icon, theme, ...extraProps }) {
  return (
    <li {...extraProps} className={styles.item}>
      <Icon theme={theme} className={styles.marker} name={icon} />
      {children}
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  theme: PropTypes.oneOf(themes),
};

ListItem.defaultProps = {
  icon: 'bullet',
  theme: 'accent',
};
