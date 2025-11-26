import { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

export default function Splash({ onComplete }: { onComplete: () => void }) {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setRotation((prev) => (prev + 1) % 6);
        }, 80);
        return () => clearInterval(timer);
    }, []);

    useInput((_input, key) => {
        if (key.return) {
            onComplete();
        }
    });

    // Flame animation frames with movement throughout
    const getFlameFrame = () => {
        const frames = [
            `
⠀⠀⠀⠀⠀⠀⢱⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⣿⣷⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣧⠀⠀⠀
⠀⠀⠀⠀⡀⢠⣿⡟⣿⣿⣿⡇⠀⠀
⠀⠀⠀⠀⣳⣼⣿⡏⢸⣿⣿⣿⢀⠀
⠀⠀⠀⣰⣿⣿⡿⠁⢸⣿⣿⡟⣼⡆
⢰⢀⣾⣿⣿⠟⠀⠀⣾⢿⣿⣿⣿⣿
⢸⣿⣿⣿⡏⠀⠀⠀⠃⠸⣿⣿⣿⡿
⢳⣿⣿⣿⠀⠀⠀⠀⠀⠀⢹⣿⡿⡁
⠀⠹⣿⣿⡄⠀⠀⠀⠀⠀⢠⣿⡞⠁
⠀⠀⠈⠛⢿⣄⠀⠀⠀⣠⠞⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀
`,
            `
⠀⠀⠀⠀⠀⠀⠀⢱⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⣿⣿⣷⣧⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⡟⣿⣿⣿⡆⠀⠀
⠀⠀⠀⠀⣰⣼⣿⡏⢸⣿⣿⣿⡀⠀
⠀⠀⠀⣴⣿⣿⡿⠁⢸⣿⣿⡟⣧⠀
⢰⢀⣾⣿⣿⠟⠀⠀⣾⢿⣿⣿⣿⡇
⢸⣿⣿⣿⡏⠀⠀⠀⠃⠸⣿⣿⣿⡿
⢳⣿⣿⣿⠀⠀⠀⠀⠀⠀⢹⣿⡿⡁
⠀⠹⣿⣿⡄⠀⠀⠀⠀⠀⢠⣿⡞⠁
⠀⠀⠈⠛⢿⣄⠀⠀⠀⣠⠞⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀
`,
            `
⠀⠀⠀⠀⠀⠀⣠⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⣿⣷⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣿⣿⣿⣷⡄⠀⠀⠀
⠀⠀⠀⠀⢀⣾⣿⢻⣿⣿⣿⠀⠀⠀
⠀⠀⠀⠀⣼⣿⣿⢸⣿⣿⣿⣇⠀⠀
⠀⠀⠀⣼⣿⣿⡟⢸⣿⣿⣿⣿⡄⠀
⢀⢀⣾⣿⣿⠟⠀⢸⣿⣿⣿⣿⣿⠀
⣸⣿⣿⣿⡏⠀⠀⠘⠸⣿⣿⣿⡿⡄
⢿⣿⣿⣿⠀⠀⠀⠀⠀⢹⣿⣿⡇⠀
⠀⢿⣿⣿⡄⠀⠀⠀⠀⢠⣿⡟⠁⠀
⠀⠀⠈⠻⢿⣄⠀⠀⣠⠞⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀
`,
            `
⠀⠀⠀⠀⠀⠀⢱⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⣿⣷⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣧⠀⠀⠀
⠀⠀⠀⠀⡀⢠⣿⡟⣿⣿⣿⡇⠀⠀
⠀⠀⠀⠀⣳⣼⣿⡏⢸⣿⣿⣿⢀⠀
⠀⠀⠀⣰⣿⣿⡿⠁⢸⣿⣿⡟⣼⡆
⢰⢀⣾⣿⣿⠟⠀⠀⣾⢿⣿⣿⣿⣿
⢸⣿⣿⣿⡏⠀⠀⠀⠃⠸⣿⣿⣿⡿
⢳⣿⣿⣿⠀⠀⠀⠀⠀⠀⢹⣿⡿⡁
⠀⠹⣿⣿⡄⠀⠀⠀⠀⠀⢠⣿⡞⠁
⠀⠀⠈⠛⢿⣄⠀⠀⠀⣠⠞⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀
`,
            `
⠀⠀⠀⠀⠀⠀⠀⢠⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⣿⣷⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣷⡄⠀⠀
⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣧⠀⠀
⠀⠀⠀⠀⣳⣼⣿⡇⣿⣿⣿⣿⡀⠀
⠀⠀⠀⣰⣿⣿⡿⢀⣿⣿⣿⢸⡇⠀
⠀⢀⣾⣿⣿⠟⠀⢸⣿⣿⣿⣿⣿⠀
⢸⣿⣿⣿⡏⠀⠀⠀⠸⣿⣿⣿⢿⡄
⢳⣿⣿⣿⠀⠀⠀⠀⠀⢹⣿⣿⣇⠀
⠀⠹⣿⣿⡄⠀⠀⠀⠀⢠⣿⡟⠁⠀
⠀⠀⠀⠛⢿⣄⠀⠀⣠⠞⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀
`,
            `
⠀⠀⠀⠀⠀⠀⠀⣰⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣷⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣧⠀⠀⠀
⠀⠀⠀⠀⢀⢠⣿⣿⣿⣿⣿⣇⠀⠀
⠀⠀⠀⠀⣾⣼⣿⡟⣿⣿⣿⣿⠀⠀
⠀⠀⠀⣾⣿⣿⡿⢀⣿⣿⣿⣿⡆⠀
⠀⢀⣾⣿⣿⠟⠀⢸⣿⣿⣿⣿⣿⠀
⢸⣿⣿⣿⡏⠀⠀⠀⠹⣿⣿⣿⣿⡀
⢻⣿⣿⣿⠀⠀⠀⠀⠀⢻⣿⣿⢸⠀
⠀⢻⣿⣿⡄⠀⠀⠀⠀⢸⣿⡟⠀⠀
⠀⠀⠈⠛⢿⣄⠀⠀⣠⠞⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀
`
        ];
        return frames[rotation];
    };

    return (
        <Box flexDirection="column" alignItems="center" justifyContent="center" height={25}>
            <Gradient name="morning">
                <BigText text="Alec's Template CLI" font="chrome" />
            </Gradient>

            <Box marginY={1} height={14}>
                <Text color="red">{getFlameFrame()}</Text>
            </Box>

            <Box marginY={1}>
                <Text color="cyan" bold>
                    Welcome to the Future
                </Text>
            </Box>
            <Box marginTop={1}>
                <Text dimColor>Press Enter to Login</Text>
            </Box>
        </Box>
    );
}
