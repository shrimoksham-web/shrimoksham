import os
import sys
from http.server import SimpleHTTPRequestHandler, HTTPServer

class RangeHTTPRequestHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        total_length = fs.st_size
        
        range_header = self.headers.get('Range')
        if not range_header or not range_header.startswith('bytes='):
            self.send_response(200)
            self.send_header("Content-type", self.guess_type(path))
            self.send_header("Content-Length", str(total_length))
            self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
            self.send_header("Accept-Ranges", "bytes")
            self.end_headers()
            return f

        try:
            ranges = range_header.strip().replace('bytes=', '').split('-')
            start = int(ranges[0]) if ranges[0] else 0
            end = int(ranges[1]) if len(ranges) > 1 and ranges[1] else total_length - 1
        except ValueError:
            self.send_error(400, "Invalid Range Header")
            f.close()
            return None

        if start >= total_length or end >= total_length or start > end:
            self.send_error(416, "Requested Range Not Satisfiable")
            self.send_header("Content-Range", f"bytes */{total_length}")
            self.end_headers()
            f.close()
            return None

        self.send_response(206)
        self.send_header("Content-type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{total_length}")
        self.send_header("Content-Length", str(end - start + 1))
        self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()

        f.seek(start)
        
        class PartialFileWrapper:
            def __init__(self, file_obj, length):
                self.file_obj = file_obj
                self.remaining = length
            def read(self, size=-1):
                if self.remaining <= 0:
                    return b""
                if size < 0 or size > self.remaining:
                    size = self.remaining
                data = self.file_obj.read(size)
                self.remaining -= len(data)
                return data
            def close(self):
                self.file_obj.close()

        return PartialFileWrapper(f, end - start + 1)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, RangeHTTPRequestHandler)
    print(f"Serving HTTP with Range support on port {port}...")
    httpd.serve_forever()
