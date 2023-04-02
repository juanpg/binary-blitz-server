const baseUrl = '/scores';

const check = async (roundTimes) => {
    const response = await fetch(`${baseUrl}/check`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roundTimes)
    });
}

const add = async (roundTimes, playerName, cookieID) => {

}

export default { check, add }