'use client';
import * as React from 'react';
import { usePathname, useParams } from 'next/navigation';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function Layout(props: { children: React.ReactNode }) {
const pathname = usePathname();
  const params = useParams();
  const [claimId] = params.segments ?? [];

  const title = React.useMemo(() => {
    if (pathname === '/claims/new') {
      return 'New Claim';
    }
    if (claimId && pathname.includes('/edit')) {
      return `Claim ${claimId} - Edit`;
    }
    if (claimId) {
      return `Claim ${claimId}`;
    }
    return undefined;
  }, [claimId, pathname]);

  return (
    <DashboardLayout>
      <PageContainer title={title}>{props.children}</PageContainer>
    </DashboardLayout>
  );
}  
