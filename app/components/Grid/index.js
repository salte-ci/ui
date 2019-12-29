import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';
import { MergeDeep } from '../../utils/merge';
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from '../../utils/prop-type-values';

export function Grid({ alignItems, justifyContent, children, className, direction, flex, style, ...extraProps }) {
  return (
    <div
      {...extraProps}
      id="grid"
      className={ConcatClassNames(styles.grid, className)}
      direction={direction}
      style={MergeDeep({ alignItems, justifyContent, flex }, style)}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  alignItems: PropTypes.oneOf(ALIGN_ITEMS),
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(FLEX_DIRECTION),
  flex: PropTypes.number,
  justifyContent: PropTypes.oneOf(JUSTIFY_CONTENT),
  style: PropTypes.object,
};

Grid.defaultProps = {
  direction: 'row',
};
