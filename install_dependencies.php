<?php
echo "<h1>Installing Production Dependencies...</h1>";
echo "<pre>";

// Set strict production environment
putenv('NODE_ENV=production');

// Run npm install with flags to reduce memory usage and skip dev dependencies
$command = 'npm install --production --no-save --no-audit 2>&1';

echo "Running: $command\n\n";

// Execute command and stream output
$output = shell_exec($command);

echo $output;
echo "</pre>";
echo "<h2>✅ Installation Complete (Check logs above for errors)</h2>";
echo "<p>If you see 'audited' or 'added' packages, it worked!</p>";
?>
