export default {
  async fetch(request) {
    try {
      // Attempt to fetch from your origin (Raspberry Pi)
      const response = await fetch(request, { cf: { cacheEverything: false } });

      // If the origin returns successfully, just return it
      return response;
    } catch (err) {
      // If the origin is offline/unreachable, show offline message
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>ByteSeeker.cc is Offline</title>
            <style>
              body {
                background-color: #111;
                color: #fff;
                font-family: sans-serif;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
              h1 {
                font-size: 2em;
              }
              p {
                font-size: 1.2em;
                max-width: 600px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <h1>ByteSeeker.cc is currently offline</h1>
            <p>This site is self-hosted. The Raspberry Pi is currently offline or unreachable.</p>
          </body>
        </html>
      `, {
        status: 503,
        headers: {
          "Content-Type": "text/html",
          "X-Offline": "true"
        }
      });
    }
  }
}
