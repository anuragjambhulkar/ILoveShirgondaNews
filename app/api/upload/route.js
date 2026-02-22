import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { extractToken, verifyToken } from '@/lib/auth';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  // Authentication check
  const token = extractToken(request);
  const decoded = verifyToken(token);

  if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'editor')) {
    const res = NextResponse.json({ success: false, error: 'Unauthorized. Only admins and editors can upload images.' }, { status: 401 });
    return handleCORS(res);
  }

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

    // Convert file to Buffer then to Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64Image,
        {
          folder: 'shrigonda_news',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    console.log(`✅ File uploaded to Cloudinary: ${uploadResponse.secure_url}`);

    const res = NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });
    return handleCORS(res);
  } catch (error) {
    console.error('❌ Upload error:', error);
    const res = NextResponse.json({ success: false, error: 'File upload failed: ' + error.message }, { status: 500 });
    return handleCORS(res);
  }
}
