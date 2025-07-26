export default {
  async fetch(request, env, ctx) {
    const upstream = 'https://byteseeker.cc';

    try {
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
      const now = new Date();
      const timestamp = now.toLocaleString("en-US", {
        timeZone: "America/New_York", // Adjust this if needed
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });

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
            .timestamp {
              margin-top: 2em;
              font-size: 1em;
              color: #888;
            }
          </style>
        </head>
        <body>
          <h1>The ByteSeeker Website is Offline</h1>
          <p>
            This website is self-hosted on a Raspberry Pi,<br>
            which is currently offline or unavailable. Please try again later.<br><br>
            If this site is not back up within 48 hours, please email the owner at
            <a href="mailto:jj@byteseeker.cc">jj@byteseeker.cc</a>
          </p>
          <div class="timestamp">Offline as of ${timestamp}</div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
      });
    }
  }
}
