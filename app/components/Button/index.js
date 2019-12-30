import React from 'react';
import PropTypes from 'prop-types';
import { ALIGN_SELF } from '../../utils/prop-type-values';
import { THEMES, GetComplementary, GetVariable } from '../../utils/theme';

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
  const finalTheme = disabled ? 'disabled' : theme;
  const complementaryTheme = GetComplementary(finalTheme);

  return (
    <Type
      {...extraProps}
      disabled={disabled}
      rounded={rounded.toString()}
      large={large.toString()}
      role="button"
      className={styles.button}
      style={{
        alignSelf,
        '--sci-button-color': GetVariable(complementaryTheme),
        '--sci-button-background-color': GetVariable(finalTheme),
      }}
      onClick={e => {
        if (!disabled && onClick) onClick(e);
      }}>
      <div id="shadow" className={styles.shadow} />
      <div id="content" className={styles.content}>
        {icon && <Icon className={styles.icon} name={icon} large={large} theme={complementaryTheme} />}
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
  theme: PropTypes.oneOf(THEMES),
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
