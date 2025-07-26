export default {
  async fetch(request, env, ctx) {
    try {
      // Attempt to fetch from the origin (your Pi)
      const response = await fetch(request);
      
      // If origin returns successfully, pass it through
      return response;
    } catch (err) {
      // If origin is down or unreachable, show the offline message
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>ByteSeeker.cc is offline</title>
            <style>
              body {
                background-color: #111;
                color: #fff;
                font-family: sans-serif;
                text-align: center;
                padding: 50px;
              }
              h1 {
                font-size: 2em;
              }
            </style>
          </head>
          <body>
            <h1>ByteSeeker.cc is currently offline</h1>
            <p>This site is self-hosted and the Raspberry Pi is currently turned off.</p>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 503
      });
    }
  }
}
