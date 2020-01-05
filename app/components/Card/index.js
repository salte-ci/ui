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

export function Card({ children, className, direction, embed, header, loading, theme, style, onClick, ...extraProps }) {
  let padding = null;
  if (header) {
    padding = '10px';
  } else if (!embed) {
    padding = '20px';
  }

  return (
    <div
      {...extraProps}
      id="card"
      className={ConcatClassNames(styles.card, className)}
      embed={embed.toString()}
      loading={loading.toString()}
      style={MergeDeep(style || {}, {
        '--sci-card-accent-color': GetVariable(theme),
        paddingTop: padding,
      })}>
      {onClick && (
        <div
          className={styles.hover}
          aria-label="Card"
          role="button"
          tid="card-click-handler"
          tabIndex="0"
          onClick={onClick}
          onKeyDown={onClick}
        />
      )}
      <Grid tid="layout" direction={direction} spacing={10} flex={1} style={{ height: '100%' }}>
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
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(FLEX_DIRECTION),
  embed: PropTypes.bool,
  header: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.object,
  theme: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  direction: 'column',
  embed: false,
  loading: false,
  theme: 'accent',
};
