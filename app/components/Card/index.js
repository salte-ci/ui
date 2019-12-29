import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { H3 } from '../H3';
import { Line } from '../Line';

import styles from './index.css';
import { GetTheme } from '../../utils/theme';
import { ConcatClassNames } from '../../utils/class-names';
import { MergeDeep } from '../../utils/merge';
import { Grid } from '../Grid';

export function Card({ children, className, embed, header, theme, style, ...extraProps }) {
  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(GetTheme(theme));
  }, [theme]);

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
      direction="column"
      embed={embed.toString()}
      style={MergeDeep(style || {}, {
        backgroundColor: GetTheme('secondary'),
        borderTopColor: color,
        paddingTop: padding,
      })}>
      {header && (
        <>
          <H3 id="header" align="center">
            {header}
          </H3>
          <Line id="divider" color={color} />
        </>
      )}
      {children}
    </Grid>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  embed: PropTypes.bool,
  header: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.string,
};

Card.defaultProps = {
  embed: false,
  theme: 'accent',
};
