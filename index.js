export default {
  async fetch(request, env, ctx) {
    const upstream = 'https://byteseeker.cc';
    const url = new URL(request.url);

    try {
      // Try to fetch from your Pi
      const response = await fetch(upstream + url.pathname, { cf: { cacheEverything: false } });

      if (response.ok) {
        // If Pi is online, clear the KV timestamp (if any)
        await env.OFFLINE_KV.delete("offline_since");
        return response;
      } else {
        return await offlineFallback(env);
      }
    } catch (err) {
      return await offlineFallback(env);
    }

    async function offlineFallback(env) {
      let offlineSince = await env.OFFLINE_KV.get("offline_since");

      if (!offlineSince) {
        // First time Pi is offline — save timestamp
        offlineSince = new Date().toISOString();
        await env.OFFLINE_KV.put("offline_since", offlineSince);
      }

      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>ByteSeeker Offline</title>
          <style>
            body {
              background: #121212;
              color: #f0f0f0;
              font-family: sans-serif;
              text-align: center;
              padding: 80px;
            }
            h1 {
              font-size: 3em;
              margin-bottom: 0.5em;
            }
            p {
              font-size: 1.4em;
              color: #ccc;
            }
          </style>
        </head>
        <body>
          <h1>The ByteSeeker Website is Offline</h1>
          <p>This website is self-hosted on a Raspberry Pi,<br>which is currently offline or unavailable.</p>
<p><strong>Offline since:</strong> ${new Date(offlineSince).toLocaleString('en-US', {
  timeZone: 'America/New_York',
  timeZoneName: 'short'
})}</p>
          <p>If this site is not back up within 48 hours, please email the owner at <a href="mailto:jj@byteseeker.cc">jj@byteseeker.cc</a></p>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
      });
    }
  }
}
