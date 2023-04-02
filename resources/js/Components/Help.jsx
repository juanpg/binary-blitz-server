import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Heading, Text, OrderedList, UnorderedList, ListItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { AppContext } from '../Context/appContext';

function Help() {
  const { isHelpOpen, closeHelp } = useContext(AppContext);

  return (
    <Modal isOpen={isHelpOpen} onClose={closeHelp} scrollBehavior='inside' size='3xl'>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Binary Blitz Help</ModalHeader>
            <ModalCloseButton />
            <ModalBody px='7' pb='5'>
                <Heading size='md' mb={2}>Goal</Heading>
                <Text mb={3}>The objective of the game is to convert decimal numbers from 1 to 255 to binary as fast as possible, for as many rounds as possible without making a mistake.</Text>
                <Heading size='md' mt={4} mb={2}>Instructions</Heading>
                <OrderedList spacing={2} mb={3}>
                    <ListItem>You are blue, the computer is red.</ListItem>
                    <ListItem>Click the 'Start' button to begin a new game.</ListItem>
                    <ListItem>A random number from 1 to 255 will be displayed on the right. Use the mouse or the keyboard to toggle the blue zeros and ones, so they display the binary equivalent of the decimal number.</ListItem>
                    <ListItem>You can use the keyboard keys <b>a</b>, <b>s</b>, <b>d</b> and <b>f</b> to control bits 128, 64, 32 and 16, and keys <b>j</b>, <b>k</b>, <b>l</b> and <b>;</b> to control bits 8, 4, 2 and 1.</ListItem>
                    <ListItem>Click the 'Submit' button or press the Spacebar to confirm your choices. This will validate your answer.</ListItem>
                    <ListItem>Click the 'Start' button once again, or press the Spacebar, to begin a new round.</ListItem>
                    <ListItem>At rounds 21, 41, 61, 81 and 101 the game increases the level of difficulty as explained below, but the computer delay is reset to 2 seconds.</ListItem>
                </OrderedList>
                <Heading size='md' mb={2}>Difficulty levels</Heading>
                <Text mb={3}>The game has five difficulty levels, which increase every 20 rounds. At each level, the computer delay is reset to 2s, and a new challenge is introduced:</Text>
                <UnorderedList spacing={2}>
                    <ListItem>At level 21, the number to convert disappears after a few seconds.</ListItem>
                    <ListItem>At level 41, the bit values (128, 64, 32, etc.) disappear.</ListItem>
                    <ListItem>At level 61, the computer number is no longer shown.</ListItem>
                    <ListItem>At level 81, you can't unclick a bit.</ListItem>
                    <ListItem>At level 101, your conversion number is no longer shown.</ListItem>
                </UnorderedList>
            </ModalBody>
        </ModalContent>
    </Modal>
  );
}

export default Help;