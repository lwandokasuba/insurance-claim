import { NextRequest, NextResponse } from 'next/server';
import type { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import type { OmitId } from '@toolpad/core/Crud';
import { getClaimsStore, setClaimsStore } from '@/store/claimsStore';
import { Claim } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page: GridPaginationModel['page'] = Number(searchParams.get('page')) || 0;
  const pageSize: GridPaginationModel['pageSize'] = Number(searchParams.get('pageSize')) || 10;
  const sortModel: GridSortModel = searchParams.get('sort')
    ? JSON.parse(searchParams.get('sort')!)
    : [];
  const filterModel: GridFilterModel = searchParams.get('filter')
    ? JSON.parse(searchParams.get('filter')!)
    : [];

  const claimsStore = await getClaimsStore();

  let filteredClaims = [...claimsStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredClaims = filteredClaims.filter((claim) => {
        const claimValue = claim[field];

        switch (operator) {
          case 'contains':
            return String(claimValue).toLowerCase().includes(String(value).toLowerCase());
          case 'equals':
            return claimValue === value;
          case 'startsWith':
            return String(claimValue).toLowerCase().startsWith(String(value).toLowerCase());
          case 'endsWith':
            return String(claimValue).toLowerCase().endsWith(String(value).toLowerCase());
          case '>':
            return (claimValue as number) > value;
          case '<':
            return (claimValue as number) < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredClaims.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if ((a[field] as number) < (b[field] as number)) {
          return sort === 'asc' ? -1 : 1;
        }
        if ((a[field] as number) > (b[field] as number)) {
          return sort === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedClaims = filteredClaims.slice(start, end);

  return NextResponse.json({
    items: paginatedClaims,
    itemCount: filteredClaims.length,
  });
}

export async function POST(req: NextRequest) {
  const body: Partial<OmitId<Claim>> = await req.json();

  const newClaim = {
    ...body,
  } as Claim;

  await setClaimsStore(newClaim);

  return NextResponse.json(newClaim, { status: 201 });
}
