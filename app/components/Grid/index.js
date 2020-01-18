import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';
import { MergeDeep } from '../../utils/merge';
import {
  ALIGN_ITEMS,
  FLEX_DIRECTION,
  JUSTIFY_CONTENT,
} from '../../utils/prop-type-values';

export function Grid({
  alignItems,
  justifyContent,
  children,
  className,
  direction,
  flex,
  responsive,
  style,
  spacing,
  type: Type,
  ...extraProps
}) {
  const internalStyle = {
    flex,
  };

  const innerStyle = {
    '--sci-grid-spacing':
      typeof spacing === 'number' ? `${spacing}px` : spacing,
    alignItems,
    justifyContent,
  };

  return (
    <Type
      {...extraProps}
      id="grid"
      className={ConcatClassNames(styles.grid, className)}
      direction={direction}
      responsive={responsive.toString()}
      style={MergeDeep(internalStyle, style)}
    >
      <div tid="inner-grid" className={styles.innerGrid} style={innerStyle}>
        {children}
      </div>
    </Type>
  );
}

Grid.propTypes = {
  alignItems: PropTypes.oneOf(ALIGN_ITEMS),
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(FLEX_DIRECTION),
  responsive: PropTypes.bool,
  flex: PropTypes.number,
  justifyContent: PropTypes.oneOf(JUSTIFY_CONTENT),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  type: PropTypes.elementType,
};

Grid.defaultProps = {
  direction: 'row',
  responsive: false,
  spacing: 20,
  type: 'div',
};
