/* istanbul ignore file */
// This file is incredibly difficult to test due to needing SVGR for the SVG imports.

import { loadable } from '../loadable';

let icons;
export function GetIcons() {
  if (!icons) {
    icons = {
      bitbucket: loadable(() => import('../../../images/icons/bitbucket.svg')),
      github: loadable(() => import('../../../images/icons/github.svg')),
      gitlab: loadable(() => import('../../../images/icons/gitlab.svg')),
      logo: loadable(() => import('../../../images/icons/logo.svg')),
      infinite: loadable(() => import('../../../images/icons/infinite.svg')),
      bullet: loadable(() => import('../../../images/icons/bullet.svg')),
    };
  }

  return icons;
}

export function GetIcon(name) {
  return GetIcons()[name];
}
