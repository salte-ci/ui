import React from 'react';
import PropTypes from 'prop-types';
import Syntax from 'react-highlight';
import '../../../node_modules/highlight.js/styles/monokai.css';

import { LANGUAGES } from '../../utils/prop-type-values';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';

export function Highlight({ children, language, ...extraProps }) {
  return (
    <div {...extraProps} className={styles.highlight}>
      <Syntax className={ConcatClassNames(styles.hljs, language)}>
        {children}
      </Syntax>
    </div>
  );
}

Highlight.propTypes = {
  children: PropTypes.node,
  language: PropTypes.oneOf(LANGUAGES).isRequired,
};
