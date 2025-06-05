import http.server
import socketserver
from urllib.parse import urlparse
import os

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

        # Set correct MIME type for JavaScript files
        if path.endswith('.js'):
            try:
                file_path = self.translate_path(path)
                if not os.path.exists(file_path):
                    self.send_error(404, "File not found")
                    return
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/javascript; charset=utf-8')
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.send_header('Pragma', 'no-cache')
                self.send_header('Expires', '0')
                self.end_headers()
                
                with open(file_path, 'rb') as file:
                    self.wfile.write(file.read())
                return
            except Exception as e:
                print(f"Error serving {path}: {str(e)}")
                self.send_error(500, f"Internal server error: {str(e)}")
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