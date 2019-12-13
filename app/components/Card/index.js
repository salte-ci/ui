import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { H3 } from '../H3';
import { Line } from '../Line';

import styles from './index.css';
import { GetTheme } from '../../utils/theme';
import { ConcatClassNames } from '../../utils/class-names';

export function Card({ children, className, embed, header, theme, ...extraProps }) {
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
    <div
      {...extraProps}
      id="card"
      className={ConcatClassNames([styles.card, className])}
      embed={embed.toString()}
      style={{ backgroundColor: GetTheme('secondary'), borderTopColor: color, paddingTop: padding }}>
      {header && (
        <>
          <H3 id="header" className={styles.header}>
            {header}
          </H3>
          <Line id="divider" className={styles.divider} color={color} />
        </>
      )}
      <div>{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  embed: PropTypes.bool,
  header: PropTypes.string,
  theme: PropTypes.string,
};

Card.defaultProps = {
  embed: false,
  theme: 'accent',
};
