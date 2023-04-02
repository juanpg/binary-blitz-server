import { ChakraProvider, Container, Flex, VStack, Box, Button } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { AppContextProvider } from '../Context/appContext';

import Nav from '../Components/Nav';
import Game from '../Components/Game';
import Footer from '../Components/Footer';
import Help from '../Components/Help';
import OverallStats from '../Components/OverallStats';
import Settings from '../Components/Settings';
import MyCookieConsent from '../Components/MyCookieConsent';

export default function Welcome(props) {
    return (
        <>
            <Head title='Welcome' />
            <ChakraProvider>
                <AppContextProvider>
                    <main>
                        <Container maxW={'container.md'} p={0}>
                            <Flex h="100vh" py={10} mb={5}>
                                <VStack w='full' h='full' px={5} py={5} spacing={10} alignItems='center'>
                                    <Nav />
                                    <Game />
                                    <Footer />
                                    <Help />
                                    <OverallStats />
                                    <Settings />
                                </VStack>
                                <MyCookieConsent />
                            </Flex>
                        </Container>
                    </main>                    
                </AppContextProvider>
            </ChakraProvider>
        </>
    )
}