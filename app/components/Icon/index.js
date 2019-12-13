import React from 'react';
import PropTypes from 'prop-types';

import { GetComplementary } from '../../utils/theme';
import { ConcatClassNames } from '../../utils/class-names';
import { GetIcon } from '../../utils/icons';

import styles from './index.css';

export function Icon({ alt, className, color, name, large, theme, ...extraProps }) {
  if (name.match(/https?:\/\//)) {
    return (
      <img
        {...extraProps}
        className={ConcatClassNames([styles.icon, className])}
        large={large.toString()}
        src={name}
        alt={alt}
      />
    );
  }

  const Element = GetIcon(name);

  if (!Element) return null;

  return (
    <Element
      {...extraProps}
      className={ConcatClassNames([styles.icon, className])}
      large={large.toString()}
      style={{
        fill: color || GetComplementary(theme),
      }}
    />
  );
}

Icon.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  large: PropTypes.bool,
  theme: PropTypes.string,
};

Icon.defaultProps = {
  alt: 'picture',
  large: false,
  theme: 'primary',
};
