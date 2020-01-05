import { WaitForTime } from '../../utils/wait';

import * as WindowUtils from '../../utils/window';
import { chance, MockOrganization, GenerateArray } from '../../utils/test/mock';

export async function GetOrganizationsForUser() {
  await WaitForTime();

  if (WindowUtils.search().includes('error')) {
    throw new Error('Failed to retrieve organizations for user.');
  }

  return GenerateArray(chance.integer({ min: 1, max: 10 }), index =>
    MockOrganization({
      id: index + 1,
    }),
  );
}
