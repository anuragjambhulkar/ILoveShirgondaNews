# Fixing MongoDB Connection Refused Error

The error `connect ECONNREFUSED 35.244.11.159:27017` means your cPanel server is trying to connect to MongoDB Atlas, but the connection is being blocked.

## Cause
MongoDB Atlas has a security firewall that **blocks all unknown IP addresses** by default. Your cPanel server has a different IP address than your local computer, so it is being blocked.

## Solution: Whitelist Your cPanel Server IP

1.  **Log in to MongoDB Atlas**: Go to [https://cloud.mongodb.com](https://cloud.mongodb.com).
2.  **Go to Network Access**: On the left sidebar, under "Security", click **Network Access**.
3.  **Add IP Address**:
    *   Click the green **+ ADD IP ADDRESS** button.
    *   **Option A (Best Security)**: Enter the specific IP address of your cPanel server. (You can find this in cPanel dashboard on the right side, usually called "Shared IP Address" or "Server IP").
    *   **Option B (Easiest)**: Click **ALLOW ACCESS FROM ANYWHERE** (0.0.0.0/0).
        *   *Note: This allows any computer with the password to connect. It is less secure but guarantees it will work.*
4.  **Confirm**: Click **Confirm**.
5.  **Wait**: It takes about 1-2 minutes for the changes to deploy.
6.  **Restart App**: Go back to cPanel Node.js App and click **Restart**.

## Alternative Cause: Hosting Firewall
If you have allowed access from anywhere (0.0.0.0/0) and it *still* fails, your hosting provider (GoDaddy, Namecheap, etc.) might be blocking **Outgoing Port 27017**.
*   **Fix**: Contact your hosting support and ask: *"Please open outgoing port 27017 for my account so I can connect to an external MongoDB database."*
