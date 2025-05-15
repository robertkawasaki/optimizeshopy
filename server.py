import http.server
import socketserver
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        # Handle /thank-you by serving /thank-you.html content without redirect
        if path == '/thank-you':
            self.send_response(302)  # 302 Found (temporary redirect)
            self.send_header('Location', '/thank-you.html')
            self.end_headers()
            return
        
        # Handle /terms-conditions redirect
        if path == '/terms-conditions':
            self.send_response(302)  # 302 Found (temporary redirect)
            self.send_header('Location', '/legal.html')
            self.end_headers()
            return

        # Set correct MIME type for JavaScript modules
        if path.endswith('.js'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript')
            self.end_headers()
            with open(self.translate_path(path), 'rb') as file:
                self.wfile.write(file.read())
            return

        # Handle all other requests normally
        super().do_GET()

    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

PORT = 8000
Handler = CustomHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever() 