import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ALIGN_SELF } from '../../utils/prop-type-values';
import { GetThemeAndComplementary, themes } from '../../utils/theme';
import { BoxShadows } from '../../utils/shadow';

import styles from './index.css';
import { Icon } from '../Icon';

export function Button({
  alignSelf,
  children,
  disabled,
  icon,
  theme,
  type: Type,
  rounded,
  large,
  onClick,
  ...extraProps
}) {
  const [color, setColor] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(null);

  useEffect(() => {
    if (disabled) {
      const [themeColor, complementaryColor] = GetThemeAndComplementary('disabled');

      setColor(complementaryColor);
      setBackgroundColor(themeColor);
    } else {
      const [themeColor, complementaryColor] = GetThemeAndComplementary(theme);

      setColor(complementaryColor);
      setBackgroundColor(themeColor);
    }
  }, [disabled, theme]);

  return (
    <Type
      {...extraProps}
      disabled={disabled}
      rounded={rounded.toString()}
      large={large.toString()}
      role="button"
      className={styles.button}
      style={{ alignSelf }}
      onClick={e => {
        if (!disabled && onClick) onClick(e);
      }}>
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
  alignSelf: PropTypes.oneOf(ALIGN_SELF),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  theme: PropTypes.oneOf(themes),
  type: PropTypes.elementType,
  rounded: PropTypes.bool,
  large: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  theme: 'primary',
  type: 'div',
  rounded: false,
  large: false,
};
