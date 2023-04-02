import { Box, Flex } from "@chakra-ui/react";

function Difficulty({level, delay}) {
    const levelDescriptions = ['Normal', 'Vanishing Goal', 'No bit values', 'No red sum', 'No unclicking', 'No blue sum'];
    let currentDifficulty = null;
    if(level <= 5) {
        currentDifficulty = levelDescriptions[level];
    } else {
        currentDifficulty = levelDescriptions[levelDescriptions.length - 1];
    }
    return (
        <Flex flexDirection='column' textAlign='center'>
            <Box>Difficulty: {currentDifficulty}</Box>
            <Box>Computer Delay: {(delay / 1000).toFixed(3)}s</Box>
        </Flex>
    )
}

export default Difficulty;