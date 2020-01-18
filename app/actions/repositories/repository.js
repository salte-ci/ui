import { WaitForTime } from '../../utils/wait';

import * as WindowUtils from '../../utils/window';
import { chance, GenerateArray, MockRepository } from '../../utils/test/mock';

export async function GetRepositoriesForOrganization(organizationID) {
  await WaitForTime();

  if (WindowUtils.search().includes('error')) {
    throw new Error('Failed to retrieve repositories for organization.');
  }

  return GenerateArray(chance.integer({ min: 1, max: 4 }), (index) =>
    MockRepository({
      id: index + 1,
      organizationID,
    }),
  );
}
