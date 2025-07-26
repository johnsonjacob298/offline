export default {
  async fetch(request, env, ctx) {
    const upstream = 'https://byteseeker.cc';

    try {
      // Try loading from the actual site (hosted on your Pi)
      const url = new URL(request.url);
      const response = await fetch(upstream + url.pathname);

      if (response.ok) {
        return response;
      } else {
        return offlineFallback();
      }
    } catch (err) {
      return offlineFallback();
    }

    function offlineFallback() {
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
          <p>This website is self-hosted on a Raspberry Pi,<br>which is currently offline.<br>Please try again later.</p>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
      });
    }
  }
}
