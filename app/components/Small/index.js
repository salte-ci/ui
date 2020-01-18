import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ALL_THEMES, GetVariable } from '../../utils/theme';
import { MergeDeep } from '../../utils/merge';
import { TEXT_ALIGN } from '../../utils/prop-type-values';

export function Small({ align, children, style, theme, ...extraProps }) {
  return (
    <div
      {...extraProps}
      id="small"
      className={styles.small}
      style={MergeDeep(
        {
          '--sci-small-color': GetVariable(theme),
          textAlign: align,
        },
        style,
      )}
    >
      {children}
    </div>
  );
}

Small.propTypes = {
  align: PropTypes.oneOf(TEXT_ALIGN),
  children: PropTypes.node,
  style: PropTypes.object,
  theme: PropTypes.oneOf(ALL_THEMES),
};

Small.defaultProps = {
  theme: 'darken',
};
