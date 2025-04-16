import * as React from 'react';

import { Crud } from '@toolpad/core/Crud';
import { claimsCache, claimsDataSource } from '@/data/claims';
import { Claim } from '@/types';


export default async function ClaimsCrudPage() {
  

  return (
    <Crud<Claim>
      dataSource={claimsDataSource}
      dataSourceCache={claimsCache}
      rootPath="/claims"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}
