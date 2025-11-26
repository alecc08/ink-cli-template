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

    // Flame animation frames split into sections for gradient coloring
    const getFlameFrame = () => {
        const frames = [
            // Frame 1
            {
                top: `⠀⠀⠀⠀⠀⠀⢱⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⣿⣷⡀⠀⠀⠀⠀`,
                middle: `⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣧⠀⠀⠀
⠀⠀⠀⠀⡀⢠⣿⡟⣿⣿⣿⡇⠀⠀
⠀⠀⠀⠀⣳⣼⣿⡏⢸⣿⣿⣿⢀⠀`,
                lower: `⠀⠀⠀⣰⣿⣿⡿⠁⢸⣿⣿⡟⣼⡆
⢰⢀⣾⣿⣿⠟⠀⠀⣾⢿⣿⣿⣿⣿
⢸⣿⣿⣿⡏⠀⠀⠀⠃⠸⣿⣿⣿⡿`,
                base: `⢳⣿⣿⣿⠀⠀⠀⠀⠀⠀⢹⣿⡿⡁
⠀⠹⣿⣿⡄⠀⠀⠀⠀⠀⢠⣿⡞⠁
⠀⠀⠈⠛⢿⣄⠀⠀⠀⣠⠞⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀`
            },
            // Frame 2
            {
                top: `⠀⠀⠀⠀⠀⠀⠀⢱⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⡀⠀⠀⠀`,
                middle: `⠀⠀⠀⠀⠀⠀⣸⣿⣿⣷⣧⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⡟⣿⣿⣿⡆⠀⠀
⠀⠀⠀⠀⣰⣼⣿⡏⢸⣿⣿⣿⡀⠀`,
                lower: `⠀⠀⠀⣴⣿⣿⡿⠁⢸⣿⣿⡟⣧⠀
⢰⢀⣾⣿⣿⠟⠀⠀⣾⢿⣿⣿⣿⡇
⢸⣿⣿⣿⡏⠀⠀⠀⠃⠸⣿⣿⣿⡿`,
                base: `⢳⣿⣿⣿⠀⠀⠀⠀⠀⠀⢹⣿⡿⡁
⠀⠹⣿⣿⡄⠀⠀⠀⠀⠀⢠⣿⡞⠁
⠀⠀⠈⠛⢿⣄⠀⠀⠀⣠⠞⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀`
            },
            // Frame 3
            {
                top: `⠀⠀⠀⠀⠀⠀⣠⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⣿⣷⡀⠀⠀⠀⠀`,
                middle: `⠀⠀⠀⠀⠀⢀⣿⣿⣿⣷⡄⠀⠀⠀
⠀⠀⠀⠀⢀⣾⣿⢻⣿⣿⣿⠀⠀⠀
⠀⠀⠀⠀⣼⣿⣿⢸⣿⣿⣿⣇⠀⠀`,
                lower: `⠀⠀⠀⣼⣿⣿⡟⢸⣿⣿⣿⣿⡄⠀
⢀⢀⣾⣿⣿⠟⠀⢸⣿⣿⣿⣿⣿⠀
⣸⣿⣿⣿⡏⠀⠀⠘⠸⣿⣿⣿⡿⡄`,
                base: `⢿⣿⣿⣿⠀⠀⠀⠀⠀⢹⣿⣿⡇⠀
⠀⢿⣿⣿⡄⠀⠀⠀⠀⢠⣿⡟⠁⠀
⠀⠀⠈⠻⢿⣄⠀⠀⣠⠞⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀`
            },
            // Frame 4
            {
                top: `⠀⠀⠀⠀⠀⠀⢱⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⣿⣷⡀⠀⠀⠀⠀`,
                middle: `⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣧⠀⠀⠀
⠀⠀⠀⠀⡀⢠⣿⡟⣿⣿⣿⡇⠀⠀
⠀⠀⠀⠀⣳⣼⣿⡏⢸⣿⣿⣿⢀⠀`,
                lower: `⠀⠀⠀⣰⣿⣿⡿⠁⢸⣿⣿⡟⣼⡆
⢰⢀⣾⣿⣿⠟⠀⠀⣾⢿⣿⣿⣿⣿
⢸⣿⣿⣿⡏⠀⠀⠀⠃⠸⣿⣿⣿⡿`,
                base: `⢳⣿⣿⣿⠀⠀⠀⠀⠀⠀⢹⣿⡿⡁
⠀⠹⣿⣿⡄⠀⠀⠀⠀⠀⢠⣿⡞⠁
⠀⠀⠈⠛⢿⣄⠀⠀⠀⣠⠞⠋⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀`
            },
            // Frame 5
            {
                top: `⠀⠀⠀⠀⠀⠀⠀⢠⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⣿⣷⡀⠀⠀⠀`,
                middle: `⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣷⡄⠀⠀
⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣧⠀⠀
⠀⠀⠀⠀⣳⣼⣿⡇⣿⣿⣿⣿⡀⠀`,
                lower: `⠀⠀⠀⣰⣿⣿⡿⢀⣿⣿⣿⢸⡇⠀
⠀⢀⣾⣿⣿⠟⠀⢸⣿⣿⣿⣿⣿⠀
⢸⣿⣿⣿⡏⠀⠀⠀⠸⣿⣿⣿⢿⡄`,
                base: `⢳⣿⣿⣿⠀⠀⠀⠀⠀⢹⣿⣿⣇⠀
⠀⠹⣿⣿⡄⠀⠀⠀⠀⢠⣿⡟⠁⠀
⠀⠀⠀⠛⢿⣄⠀⠀⣠⠞⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀`
            },
            // Frame 6
            {
                top: `⠀⠀⠀⠀⠀⠀⠀⣰⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣷⠀⠀⠀⠀`,
                middle: `⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣧⠀⠀⠀
⠀⠀⠀⠀⢀⢠⣿⣿⣿⣿⣿⣇⠀⠀
⠀⠀⠀⠀⣾⣼⣿⡟⣿⣿⣿⣿⠀⠀`,
                lower: `⠀⠀⠀⣾⣿⣿⡿⢀⣿⣿⣿⣿⡆⠀
⠀⢀⣾⣿⣿⠟⠀⢸⣿⣿⣿⣿⣿⠀
⢸⣿⣿⣿⡏⠀⠀⠀⠹⣿⣿⣿⣿⡀`,
                base: `⢻⣿⣿⣿⠀⠀⠀⠀⠀⢻⣿⣿⢸⠀
⠀⢻⣿⣿⡄⠀⠀⠀⠀⢸⣿⡟⠀⠀
⠀⠀⠈⠛⢿⣄⠀⠀⣠⠞⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀`
            }
        ];
        return frames[rotation];
    };

    const flame = getFlameFrame();

    return (
        <Box flexDirection="column" alignItems="center" justifyContent="center" height={25}>
            <Gradient name="morning">
                <BigText text="Alec's Template CLI" font="chrome" />
            </Gradient>

            <Box marginY={1} height={14} flexDirection="column">
                <Text color="#ffaa44">{flame.top}</Text>
                <Text color="#ff9933">{flame.middle}</Text>
                <Text color="#ff6622">{flame.lower}</Text>
                <Text color="#ff4411">{flame.base}</Text>
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
