import { GridItem } from "@chakra-ui/react";

function InfoBit({bitValue, active, className}) {
    return (
        <GridItem className={`bit ${className} ${active ? 'active' : ''}`} borderRadius='2xl'>
            <span>{bitValue}</span>
        </GridItem>
    );
}

export default InfoBit;