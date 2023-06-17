import { NextRequest, NextResponse } from 'next/server';
import getPost from '../getPost';

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  return NextResponse.json(getPost(params.slug));
}