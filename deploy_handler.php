<?php
// deploy_handler.php
// A simple, secure script to accept a zipped deployment via HTTP POST.

// 1. CONFIGURATION
// You must change this token to something secure!
// This must match the 'DEPLOY_TOKEN' secret in GitHub Actions.
$secret_token = 'shrigonda-news-deploy-secret-2025';

// 2. SECURITY CHECK
$headers = getallheaders();
$auth_header = isset($headers['X-Deploy-Token']) ? $headers['X-Deploy-Token'] : '';
$query_token = isset($_GET['token']) ? $_GET['token'] : '';

if ($auth_header !== $secret_token && $query_token !== $secret_token) {
    http_response_code(403);
    die("⛔ Access Denied: Invalid Token.");
}

// 3. FILE UPLOAD HANDLING
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("👋 Ready for deployment. Please POST a zip file.");
}

if (!isset($_FILES['file'])) {
    http_response_code(400);
    die("❌ No file uploaded.");
}

$zip_file = $_FILES['file']['tmp_name'];
$target_dir = __DIR__;
$destination_zip = $target_dir . '/deployment.zip';

// Move uploaded file to current directory
if (!move_uploaded_file($zip_file, $destination_zip)) {
    http_response_code(500);
    die("❌ Failed to move uploaded file.");
}

echo "✅ File received successfully.\n";

// 4. EXTRACTION
$zip = new ZipArchive;
if ($zip->open($destination_zip) === TRUE) {
    echo "📦 Extracting...\n";
    $zip->extractTo($target_dir);
    $zip->close();
    echo "🎉 Extraction successful!\n";
    
    // Cleanup
    unlink($destination_zip);
    echo "🧹 Cleaned up zip file.\n";
} else {
    http_response_code(500);
    echo "❌ Failed to unzip file.\n";
}
?>
