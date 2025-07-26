export default {
  async fetch(request, env, ctx) {
    try {
      // Try to fetch the real site
      const response = await fetch(request);
      return response;
    } catch (err) {
      // If it fails, show the offline fallback page
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>ByteSeeker Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              background: #111;
              color: #f1f1f1;
              font-family: sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              text-align: center;
              padding: 1em;
            }
          </style>
        </head>
        <body>
          <main>
            <h1>ByteSeeker is Offline</h1>
            <p>This site is self-hosted and the Raspberry Pi is currently turned off or unreachable.</p>
          </main>
        </body>
        </html>
      `, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store',
        }
      });
    }
  }
};