import { GridItem } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

function PlayerBit({playing, bit, value, level, onChange, mappedKey}) {
    const [changed, setChanged] = useState(false);

    const triggerChange = useCallback(() => {
        if(level < 4) {
            onChange(bit)
        } else {
            if(!changed) {
                setChanged(chg => true);
                onChange(bit);
            }
        }
    }, [bit, changed, level, onChange])
    const onClick = () => {
        if(playing) {
            triggerChange();
        }
    }

    useEffect(() => {
        const thisLetter = mappedKey.toLowerCase();

        const onKeyDown = (event) => {
            if(playing && thisLetter === event.key.toLowerCase()) {
                triggerChange();                
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [playing, bit, triggerChange, mappedKey]);

    useEffect(() => {
        if(!playing) {
            setChanged(chg => false);
        }
    }, [playing]);

    return (
        <GridItem bg='blue.500' color='white' borderRadius='xl' className="bit" onClick={onClick} cursor={playing ? 'pointer' : 'default'}>
            <span>{value}</span>
        </GridItem>
    );
}

export default PlayerBit;