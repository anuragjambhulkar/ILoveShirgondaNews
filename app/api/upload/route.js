import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

// Add CORS headers
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Version');
  return response;
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 200 });
  return handleCORS(res);
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      const res = NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
      return handleCORS(res);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      const res = NextResponse.json({ success: false, error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
      return handleCORS(res);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      const res = NextResponse.json({ success: false, error: 'File size exceeds 5MB limit.' }, { status: 400 });
      return handleCORS(res);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename with sanitized name
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedName}`;
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    const imagePath = path.join(uploadsDir, filename);

    // Make sure the uploads directory exists
    await mkdir(uploadsDir, { recursive: true });

    await writeFile(imagePath, buffer);
    console.log(`✅ File uploaded successfully: ${imagePath}`);

    const imageUrl = `/uploads/${filename}`;

    const res = NextResponse.json({ success: true, url: imageUrl, filename });
    return handleCORS(res);
  } catch (error) {
    console.error('❌ Upload error:', error);
    const res = NextResponse.json({ success: false, error: 'File upload failed: ' + error.message }, { status: 500 });
    return handleCORS(res);
  }
}
