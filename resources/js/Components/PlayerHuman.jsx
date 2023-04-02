import PlayerBit from "./PlayerBit";
import { Grid, GridItem } from "@chakra-ui/react";

function PlayerHuman({playing, currentRound, playerNumber, onBitChange, mapping}) {
    const level = Math.floor((currentRound - 1) / 20);
    const displaySum = level < 5 || !playing;

    return (
        <Grid templateColumns={{base: 'repeat(9, 1fr)', md:'repeat(8,1fr) 1.25fr'}} className="number player" w='full' maxH={'50px'}>
            {playerNumber.toString(2).padStart(8, '0').split('').map((bitValue, index) => (
                <PlayerBit
                    key={index}
                    playing={playing}
                    value={bitValue}
                    bit={7-index}
                    level={level}
                    onChange={onBitChange}
                    mappedKey={mapping[index]}
                />
            ) )}
            <GridItem ml='2' bg='blue.500' color='white' borderRadius='xl' className="bit result">{displaySum ? playerNumber : ''}</GridItem>
        </Grid>
    );
}

export default PlayerHuman;