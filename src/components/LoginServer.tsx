import { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { startAuthServer } from '../auth-server.js';

export default function LoginServer({ onLogin }: { onLogin: (name: string) => void }) {
    const [status, setStatus] = useState('Starting server...');
    const [port] = useState(3000);

    useEffect(() => {
        setStatus(`Waiting for login on http://localhost:${port} ...`);
        startAuthServer(port).then((name) => {
            onLogin(name);
        });
    }, [port, onLogin]);

    return (
        <Box flexDirection="column" borderStyle="double" borderColor="yellow" padding={1}>
            <Text bold color="yellow"> AUTHENTICATION REQUIRED </Text>
            <Box marginTop={1}>
                <Text>{status}</Text>
            </Box>
            <Box marginTop={1}>
                <Text dimColor>Please open the URL in your browser to login.</Text>
            </Box>
        </Box>
    );
}
