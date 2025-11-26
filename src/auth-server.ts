import http from 'node:http';

export function startAuthServer(port: number): Promise<string> {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            if (req.method === 'GET' && req.url === '/') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
					<html>
						<body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #222; color: #fff;">
							<div style="text-align: center; padding: 2rem; border: 1px solid #444; border-radius: 8px; background: #333;">
								<h1>Login to Ink CLI</h1>
								<form method="POST" action="/login">
									<input type="text" name="name" placeholder="Enter your name" required style="padding: 0.5rem; border-radius: 4px; border: none; margin-right: 0.5rem;" />
									<button type="submit" style="padding: 0.5rem 1rem; border-radius: 4px; border: none; background: #007bff; color: white; cursor: pointer;">Login</button>
								</form>
							</div>
						</body>
					</html>
				`);
            } else if (req.method === 'POST' && req.url === '/login') {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const name = new URLSearchParams(body).get('name');
                    if (name) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(`
							<html>
								<body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #222; color: #fff;">
									<h1>Login Successful! You can return to the CLI.</h1>
									<script>setTimeout(() => window.close(), 2000);</script>
								</body>
							</html>
						`);
                        server.close();
                        resolve(name);
                    } else {
                        res.writeHead(400);
                        res.end('Name required');
                    }
                });
            } else {
                res.writeHead(404);
                res.end();
            }
        });
        server.listen(port);
    });
}
