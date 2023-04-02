import { useContext } from "react";
import { AppContext } from "../Context/appContext";
import CookieConsent from 'react-cookie-consent';

function MyCookieConsent() {
    const { acceptedCookie } = useContext(AppContext);

    return (
        <CookieConsent 
            onAccept={acceptedCookie}
            enableDeclineButton
            flipButtons
            buttonStyle={{
                backgroundColor: 'var(--chakra-colors-blue-500)',
                color: 'var(--chakra-colors-white)',
                borderRadius: 'var(--chakra-radii-md)',
                fontWeight: 'bold',
            }}
            declineButtonStyle={{
                borderRadius: 'var(--chakra-radii-md)'
            }}
        >
            This website uses cookies to track your score in the global leaderboard.
        </CookieConsent>
    );
}

export default MyCookieConsent;