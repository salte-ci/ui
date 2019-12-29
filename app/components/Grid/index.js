import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';
import { MergeDeep } from '../../utils/merge';
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from '../../utils/prop-type-values';

export function Grid({
  alignItems,
  justifyContent,
  children,
  className,
  direction,
  flex,
  style,
  spacing,
  type: Type,
  ...extraProps
}) {
  return (
    <Type
      {...extraProps}
      id="grid"
      className={ConcatClassNames(styles.grid, className)}
      direction={direction}
      style={MergeDeep({ alignItems, justifyContent, flex }, style)}
      spacing={spacing}>
      {children}
    </Type>
  );
}

Grid.propTypes = {
  alignItems: PropTypes.oneOf(ALIGN_ITEMS),
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(FLEX_DIRECTION),
  flex: PropTypes.number,
  justifyContent: PropTypes.oneOf(JUSTIFY_CONTENT),
  spacing: PropTypes.oneOf([0, 1, 2]),
  style: PropTypes.object,
  type: PropTypes.elementType,
};

Grid.defaultProps = {
  direction: 'row',
  spacing: 2,
  type: 'div',
};
