import React from 'react';
import PropTypes from 'prop-types';

import { H3 } from '../H3';
import { Line } from '../Line';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';
import { MergeDeep } from '../../utils/merge';
import { Grid } from '../Grid';
import { FLEX_DIRECTION } from '../../utils/prop-type-values';
import { GetVariable } from '../../utils/theme';

export function Card({ children, className, direction, embed, header, theme, style, ...extraProps }) {
  let padding = null;
  if (header) {
    padding = '10px';
  } else if (!embed) {
    padding = '20px';
  }

  return (
    <Grid
      {...extraProps}
      id="card"
      className={ConcatClassNames(styles.card, className)}
      direction={direction}
      embed={embed.toString()}
      style={MergeDeep(style || {}, {
        '--sci-card-accent-color': GetVariable(theme),
        paddingTop: padding,
      })}
      spacing={10}>
      {header && (
        <>
          <H3 id="header" align="center">
            {header}
          </H3>
          <Line id="divider" className={styles.divider} theme={theme} />
        </>
      )}
      {children}
    </Grid>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(FLEX_DIRECTION),
  embed: PropTypes.bool,
  header: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.string,
};

Card.defaultProps = {
  direction: 'column',
  embed: false,
  theme: 'accent',
};
