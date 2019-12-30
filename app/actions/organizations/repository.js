import { WaitForTime } from '../../utils/wait';

import * as WindowUtils from '../../utils/window';

export async function GetOrganizationsForUser() {
  await WaitForTime();

  if (WindowUtils.search().includes('error')) {
    throw new Error('Failed to retrieve organizations for user.');
  }

  return [
    {
      provider: {
        key: 'github',
        name: 'GitHub',
        type: 'github',
      },
      icon: 'https://avatars2.githubusercontent.com/u/49458560?s=200&v=4',
      key: 'salte-ci',
      name: 'Salte CI',
      repositoryCount: 21,
      buildCount: 14354,
      url: 'https://github.com/salte-ci',
    },
    {
      provider: {
        key: 'bitbucket',
        name: 'Bitbucket',
        type: 'bitbucket',
      },
      icon: 'https://avatars3.githubusercontent.com/u/13248138?s=200&v=4',
      key: 'salte-io',
      name: 'Salte',
      repositoryCount: 23,
      buildCount: 4001,
      url: 'https://bitbucket.org/salte-io/',
    },
    {
      provider: {
        key: 'gitlab',
        name: 'GitLab',
        type: 'gitlab',
      },
      icon: 'https://avatars3.githubusercontent.com/u/13248138?s=200&v=4',
      key: 'salte-io',
      name: 'Salte',
      repositoryCount: 14,
      buildCount: 4001,
      url: 'https://gitlab.com/salte-io',
    },
  ];
}
