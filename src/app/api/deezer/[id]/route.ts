import type { NextRequest } from 'next/server';

const cache = new Map<string, { url: string | null; ts: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return Response.json({ error: 'Invalid ID' }, { status: 400 });
  }

  // Check cache
  const cached = cache.get(id);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return Response.json({ preview: cached.url });
  }

  try {
    const res = await fetch(`https://api.deezer.com/track/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return Response.json({ preview: null });
    }
    const data = await res.json();
    const preview = data.preview || null;

    cache.set(id, { url: preview, ts: Date.now() });

    return Response.json({ preview });
  } catch {
    return Response.json({ preview: null });
  }
}
