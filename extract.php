<?php
/**
 * Shrigonda News - Automated Extraction Script
 * This script extracts the production zip file on your Hostasia server.
 */

$zipFile = 'shrigonda_news_production.zip';
$extractTo = './';

echo "<html><head><title>Shrigonda News - Extract</title>";
echo "<style>
    body { font-family: sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .card { background: #1e293b; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); text-align: center; border: 1px solid #ef4444; }
    h1 { color: #ef4444; margin-bottom: 1rem; }
    .btn { background: #ef4444; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-weight: bold; font-size: 1rem; text-decoration: none; display: inline-block; }
    .btn:hover { background: #dc2626; }
    .status { margin-top: 1rem; padding: 1rem; border-radius: 0.5rem; background: #334155; }
</style></head><body>";

echo "<div class='card'>";
echo "<h1>🚀 Build Extractor</h1>";

if (isset($_GET['run'])) {
    if (!file_exists($zipFile)) {
        echo "<div class='status'>❌ Error: <b>$zipFile</b> not found. Please upload it first.</div>";
    } else {
        $zip = new ZipArchive;
        if ($zip->open($zipFile) === TRUE) {
            $zip->extractTo($extractTo);
            $zip->close();
            echo "<div class='status' style='color: #4ade80;'>✅ Extraction Successful! Your site is now live.</div>";
            
            // Auto-cleanup if requested
            if (isset($_GET['cleanup']) && $_GET['cleanup'] == '1') {
                unlink($zipFile);
                echo "<p>Zip file deleted.</p>";
                // Self-destruct
                unlink(__FILE__);
                echo "<p>Cleaning up extraction script...</p>";
            } else {
                echo "<p>You can now delete this script and the zip file for security.</p>";
            }
        } else {
            echo "<div class='status'>❌ Error: Failed to open zip file.</div>";
        }
    }
} else {
    echo "<p>Extracting <b>$zipFile</b> to the current directory.</p>";
    echo "<a href='?run=1' class='btn'>Extract Now</a>";
}

echo "<br><br><small style='color: #94a3b8;'>I Love Shrigonda News - Deployment Helper</small>";
echo "</div></body></html>";
?>
