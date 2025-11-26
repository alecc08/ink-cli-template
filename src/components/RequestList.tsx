import { Box, Text, useInput } from 'ink';

export default function RequestList({ requests, onBack }: { requests: any[], onBack: () => void }) {
    useInput((_input, key) => {
        if (key.escape || key.return) {
            onBack();
        }
    });

    return (
        <Box flexDirection="column">
            <Text bold underline>Requests</Text>
            <Box flexDirection="column" marginTop={1}>
                {requests.length === 0 ? (
                    <Text italic>No requests found.</Text>
                ) : (
                    requests.map((req, index) => (
                        <Box key={index} borderStyle="single" padding={1} marginBottom={1}>
                            <Text>
                                <Text bold color={req.action === 'ADD' ? 'green' : 'yellow'}>{req.action}</Text> {req.type}: {req.data.name}
                            </Text>
                        </Box>
                    ))
                )}
            </Box>
            <Box marginTop={1}>
                <Text dimColor>Press Enter or Esc to go back</Text>
            </Box>
        </Box>
    );
}
