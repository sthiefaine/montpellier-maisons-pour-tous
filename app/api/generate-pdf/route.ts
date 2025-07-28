import { NextRequest, NextResponse } from 'next/server';
import { generatePdf } from '@/utils/generatePdf';
import { FormData } from '@/types/form';

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();
    const pdfUrl = await generatePdf(formData);
    
    return NextResponse.json({ success: true, pdfUrl });
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la génération du PDF' },
      { status: 500 }
    );
  }
} 