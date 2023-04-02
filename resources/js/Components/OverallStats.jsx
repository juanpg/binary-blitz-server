import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Heading, Text,Button, Flex, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useContext } from 'react';
import { AppContext } from '../Context/appContext';
import HorizontalBarChart from "./HorizontalBarChart";
import SparkLine from './SparkLine';

function OverallStats() {
    const { stats, isStatsOpen, closeStats, resetStats } = useContext(AppContext);

    return (
        <Modal isOpen={isStatsOpen} onClose={closeStats} scrollBehavior='inside' size={{base: 'xl', md: '2xl'}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Your Statistics</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex mb={3} justifyContent='space-between'>
                        <Heading size='md'>Overall</Heading>
                        <Button size='sm' title='Reset Statistics' colorScheme='red' onClick={resetStats}>Reset</Button>
                    </Flex>
                    <Flex mb={3} gap={4} justifyContent='center'>
                        <Flex flexDir='column' alignItems='center'>
                            <Text fontSize='lg' fontWeight='bold' color='blue.500'>{stats.statistics.totalGames}</Text>
                            <Text>Played</Text>
                        </Flex>
                        <Flex flexDir='column' alignItems='center'>
                            <Text fontSize='lg' fontWeight='bold' color='blue.500'>{stats.statistics.highestRound}</Text>
                            <Text>Max round</Text>
                        </Flex>
                        <Flex flexDir='column' alignItems='center'>
                            <Text fontSize='lg' fontWeight='bold' color='blue.500'>{stats.statistics.averageRound.toFixed(1)}</Text>
                            <Text>Avg round</Text>
                        </Flex>
                    </Flex>
                    <Heading as='h5' size='md' my={5}>Games distribution</Heading>
                    <HorizontalBarChart data={stats.distribution} />
                    <Heading as='h5' size='md' my={5}>Top 5 games</Heading>
                    <TableContainer mb={3}>
                        <Table variant='striped' colorScheme={'blackAlpha'} size='sm'>
                            <Thead>
                                <Tr>
                                    <Th scope='col'>#</Th>
                                    <Th scope='col'>Date</Th>
                                    <Th scope='col'>Rounds</Th>
                                    <Th scope='col'>Avg. time<br /> per round</Th>
                                    <Th scope='col'>Time per round</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    stats.top10.length === 0
                                    ? <Tr>
                                        <Th colSpan='5' bg=''>No Data</Th>
                                    </Tr>
                                    : stats.top10.map((topItem, idx) => {
                                    return (
                                        <Tr key={idx}>
                                            <Th scope='row'>{idx + 1}</Th>
                                            <Td>{(new Date(topItem.date)).toLocaleString()}</Td>
                                            <Td isNumeric>{topItem.rounds}</Td>
                                            <Td isNumeric>{topItem.averageTime.toFixed(3)}s</Td>
                                            <Td><SparkLine roundTimes={topItem.roundTimes ?? []} maxRound={stats.statistics.highestRound} /></Td>
                                        </Tr>
                                    );
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default OverallStats;