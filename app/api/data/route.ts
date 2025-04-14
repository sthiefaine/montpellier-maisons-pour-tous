import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const mptData = await fs.readFile(path.join(process.cwd(), 'data/mpt.json'), 'utf8');
    const activitiesData = await fs.readFile(
      path.join(process.cwd(), 'data/activities.json'),
      'utf8'
    );

    return NextResponse.json({
      mpts: JSON.parse(mptData),
      activities: JSON.parse(activitiesData),
    });
  } catch (error) {
    console.error('Error loading data:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
