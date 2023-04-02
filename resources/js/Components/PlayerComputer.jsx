import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

function PlayerComputer({playing, currentRound, goalNumber, currentBit}) {
    const level = Math.floor((currentRound - 1) / 20);
    const displaySum = level < 3 || !playing;
    const [number, setNumber] = useState('00000000');

    useEffect(() => {
        if(playing) {
            setNumber(nm => {
                const newNumber = goalNumber.toString(2).padStart(8, '0').substring(0, currentBit + 1).padEnd(8, '0');
                return newNumber;
            });
        }
    }, [playing, currentBit, goalNumber, number]);

    return (
        <Grid templateColumns={{base: 'repeat(9, 1fr)', md:'repeat(8,1fr) 1.25fr'}} className="number computer" w='full' maxH={'50px'}>
            {number.split('').map((bitValue, index) => (
                <GridItem key={index} bg='red.500' color='white' borderRadius='xl' className="bit">
                    <span>{bitValue}</span>
                </GridItem>
            ) )}
            <GridItem ml='2' bg='red.500' color='white' borderRadius='xl' className="bit result">{displaySum ? parseInt(number, 2): ''}</GridItem>
        </Grid>
    );
}

export default PlayerComputer;