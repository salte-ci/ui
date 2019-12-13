import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GetThemeAndComplementary, themes } from '../../utils/theme';
import { BoxShadows } from '../../utils/shadow';

import styles from './index.css';
import { Icon } from '../Icon';

export function Button({ children, icon, theme, type: Type, rounded, large, ...extraProps }) {
  const [color, setColor] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(null);

  useEffect(() => {
    const [themeColor, complementaryColor] = GetThemeAndComplementary(theme);

    setColor(complementaryColor);
    setBackgroundColor(themeColor);
  }, [theme]);

  return (
    <Type {...extraProps} rounded={rounded.toString()} large={large.toString()} role="button" className={styles.button}>
      <div
        id="shadow"
        className={styles.shadow}
        style={{
          boxShadow: BoxShadows(['darken', backgroundColor]),
        }}
      />
      <div id="content" className={styles.content} style={{ color, backgroundColor }}>
        {icon && <Icon className={styles.icon} name={icon} large={large} color={color} />}
        {children}
      </div>
    </Type>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  theme: PropTypes.oneOf(themes),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  rounded: PropTypes.bool,
  large: PropTypes.bool,
};

Button.defaultProps = {
  theme: 'primary',
  type: 'div',
  rounded: false,
  large: false,
};
