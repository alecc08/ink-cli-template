import { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

export default function LoginBrowser({ onLogin }: { onLogin: (name: string) => void }) {
    const [name, setName] = useState('');

    useInput((_input, key) => {
        if (key.return && name.length > 0) {
            onLogin(name);
        }
    });

    return (
        <Box flexDirection="column" borderStyle="double" borderColor="blue" padding={1}>
            <Box marginBottom={1}>
                <Text bold backgroundColor="blue" color="white"> BROWSER </Text>
                <Text>  https://ink-cli.auth/login</Text>
            </Box>
            <Box flexDirection="column" padding={1} borderStyle="single">
                <Text bold>Login to Ink CLI</Text>
                <Box marginTop={1}>
                    <Text>Enter your name: </Text>
                    <TextInput value={name} onChange={setName} />
                </Box>
                <Box marginTop={1}>
                    <Text dimColor>Press Enter to Submit</Text>
                </Box>
            </Box>
        </Box>
    );
}
