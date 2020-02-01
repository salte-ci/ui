import React from 'react';
import PropTypes from 'prop-types';
import { ALIGN_SELF } from '../../utils/prop-type-values';
import { THEMES, GetComplementary, GetVariable } from '../../utils/theme';

import styles from './index.css';
import { Icon } from '../Icon';
import { Grid } from '../Grid';
import { LoadingIndicator } from '../LoadingIndicator';

export function Button({
  alignSelf,
  children,
  disabled,
  icon,
  theme,
  type: Type,
  rounded,
  large,
  loading,
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
      loading={loading.toString()}
      icon={Boolean(icon).toString()}
      role="button"
      className={styles.button}
      style={{
        alignSelf,
        '--sci-button-color': GetVariable(complementaryTheme),
        '--sci-button-background-color': GetVariable(finalTheme),
      }}
      onClick={(e) => {
        if (!disabled && onClick) onClick(e);
      }}
    >
      <LoadingIndicator
        className={styles.loading}
        loading={loading}
        theme={complementaryTheme}
      >
        <div id="shadow" className={styles.shadow} />
        <Grid
          id="content"
          className={styles.content}
          alignItems="center"
          justifyContent="center"
          flex={1}
          spacing={10}
        >
          {icon && (
            <Icon
              className={styles.icon}
              name={icon}
              large={large}
              theme={complementaryTheme}
            />
          )}
          {typeof children === 'string' ? (
            <div test-id="wrapper">{children}</div>
          ) : (
            children
          )}
        </Grid>
      </LoadingIndicator>
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
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  theme: 'primary',
  type: 'div',
  rounded: false,
  large: false,
  loading: false,
};
