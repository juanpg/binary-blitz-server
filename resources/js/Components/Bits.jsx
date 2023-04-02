import { Grid, GridItem } from "@chakra-ui/react";
import InfoBit from "./InfoBit";

function Bits({currentBit, currentRound, goalNumber, playing}) {
    const allBits = ['128', '64', '32', '16', '8', '4', '2', '1'];
    const level = Math.floor(currentRound / 20);
    const displayGoal = level === 0 || currentBit < 2 || !playing;
    const displayBits = level < 2 || !playing;

    return (
        <Grid templateColumns={{base: 'repeat(9, 1fr)', md:'repeat(8,1fr) 1.25fr'}} className="number bits" w='full' maxH={'50px'}>
            {allBits.map((bitValue, index) => <InfoBit key={index} bitValue={displayBits ? bitValue : ''} active={index === currentBit} className="" />)}
            <GridItem ml='2' bg='' color='' borderRadius='' className="bit result">
                <span>{displayGoal ? goalNumber : ''}</span>
            </GridItem>
        </Grid>
    );
}

export default Bits;