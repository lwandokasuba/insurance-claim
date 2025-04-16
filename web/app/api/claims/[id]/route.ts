import { NextRequest, NextResponse } from 'next/server';
import type { OmitId } from '@toolpad/core/Crud';
import { deleteClaimsStore, getClaimsStore, getClaimStore, setClaimsStore, updateClaimsStore } from '@/store/claimsStore';
import { Claim } from '@/types';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: claimId } = await params;

  const claimToShow = await getClaimStore(Number(claimId));

  if (!claimToShow) {
    return NextResponse.json({ error: 'claim not found' }, { status: 404 });
  }
  return NextResponse.json(claimToShow);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const body: Partial<OmitId<Claim>> = await req.json();
  const { id: claimId } = await params;

  let updatedClaim: Claim | null = null;

 updatedClaim = (await updateClaimsStore(Number(claimId), {...body, id: Number(claimId)} as Claim))[0];

  if (!updatedClaim) {
    return NextResponse.json({ error: 'claim not found' }, { status: 404 });
  }
  return NextResponse.json(updatedClaim);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: claimId } = await params;

  await deleteClaimsStore(Number(claimId));

  return NextResponse.json({ success: true });
}
