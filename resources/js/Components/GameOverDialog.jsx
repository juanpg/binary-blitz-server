import { useRef, useContext, forwardRef,  } from 'react';
import { AppContext } from '../Context/appContext';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Alert, AlertTitle, AlertDescription, Icon, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { getCookieConsentValue } from 'react-cookie-consent';
import SubmitScore from './SubmitScore';

const GameOverAlert = ({status, backgroundColor, iconColor, icon, children}) => {
    return (
        <Alert 
            status={status} 
            flexDirection='column' 
            alignItems='center' 
            justifyContent='center' 
            textAlign='center'
            bg={backgroundColor}
        >
            <ModalCloseButton />
            <AlertTitle fontSize={'2xl'} my={3}>Game Over</AlertTitle>
            <Icon viewBox="0 0 16 16" boxSize={10} my={3} fill={ iconColor } >
                {icon}
            </Icon>
            <AlertDescription my={3}>
                <Box>
                    {children}
                </Box>
            </AlertDescription>
        </Alert>
    );
}

const NewHighScore = forwardRef(({onHighScoreSubmit}, ref) => {
    const consent = getCookieConsentValue();

    const icon = (
        <>
            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
        </>
    )

    const additionalText = consent === undefined
        ? (
            <Text mt={3} fontSize='small'>
                You need to accept cookies in order to upload a high score
            </Text>
        )
        : (
            consent === 'true' 
            ? (<Box w='full' mt={5} px={4}>
                <SubmitScore onHighScoreSubmit={onHighScoreSubmit} ref={ref} />
            </Box>)
            : null
        );

    return (

        <GameOverAlert 
            status={'success'}
            backgroundColor={useColorModeValue('white', '#222')}
            iconColor={'yellow.300'}
            icon={icon}
        >
            You got a new High Score! Congratulations!
            {additionalText}
        </GameOverAlert>
    )
});

const YouLost = () => {
    const icon = (
        <>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zm-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zM10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
        </>
    )
    return (
        <GameOverAlert 
            status='error' 
            backgroundColor={'var(--alert-bg)'} 
            iconColor={'red.400'} 
            icon={icon}
        >
            Sorry, you lost!
        </GameOverAlert>
    );
}

const GameOverDialog = ({ isOpen, onClose, isHighScore }) => {
    const { cookieID } = useContext(AppContext);
    const playerNameRef = useRef(null);

    const onHighScoreSubmit = (playerName, token) => {
        localStorage.setItem('playerName', playerName);
        console.log(playerName, token);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered initialFocusRef={playerNameRef} closeOnOverlayClick={!isHighScore}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody p={0}>
                    {
                        isHighScore ? <NewHighScore onHighScoreSubmit={onHighScoreSubmit} ref={playerNameRef} /> : <YouLost />
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default GameOverDialog;