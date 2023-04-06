import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useCallback, useState } from 'react';
import { AppContext } from '../Context/appContext';
import scoresDB from '../Services/scores';

function GlobalLeaderboard() {
    const {cookieID, isLeaderboardOpen, closeLeaderboard } = useContext(AppContext);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshEntries = useCallback(async () => {
        setLoading(true);
        const newEntries = await scoresDB.getTop50(cookieID);
        setEntries(newEntries);
        setLoading(false);
    });

    useEffect(() => {
        if(isLeaderboardOpen) {
            refreshEntries();
        }
    }, [isLeaderboardOpen]);

    return (
        <Modal isOpen={isLeaderboardOpen} onClose={closeLeaderboard} scrollBehavior='inside' size={{base: 'xl', md: '2xl'}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Global Leaderboard - Top 50 Players</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TableContainer mb={3}>
                        {loading ? (
                            <Spinner size='lg' color='blue.500' />
                        ) : (
                            <Table variant='striped' colorScheme={'blackAlpha'} size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th scope='col'>#</Th>
                                        <Th scope='col'>Date</Th>
                                        <Th scope='col'>Player</Th>
                                        <Th scope='col'>Total Rounds</Th>
                                        <Th scope='col'>Avg Time</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {entries.map((entry, idx) => {
                                        const dt = new Date(`${entry.date_played}Z`);
                                        return (
                                            <Tr key={idx} background={entry.active_player === 1 ? 'blue.500' : ''}>
                                                <Th scope='row'>{idx + 1}</Th>
                                                <Td>{dt.toLocaleDateString()} {dt.toLocaleTimeString()}</Td>
                                                <Td>{entry.display_name}</Td>
                                                <Td isNumeric>{entry.total_rounds}</Td>
                                                <Td isNumeric>{(entry.avg_time / 1000).toFixed(3)}s</Td>
                                            </Tr>
                                        )}
                                    )}
                                </Tbody>
                            </Table>
                        )}
                    </TableContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default GlobalLeaderboard;