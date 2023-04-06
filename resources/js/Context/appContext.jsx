import { createContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [ keyboardMap, setKeyboardMap ] = useState(localStorage.getItem('mapping') ?? 'asdfjkl;');
  const [ stats, setStats ] = useState(JSON.parse(localStorage.getItem('stats') ?? '{"statistics": {"totalGames": 0, "highestRound": 0, "averageRound": 0}, "distribution": {}, "top10": []}'));
  const [ cookieID, setCookieID ] = useState(localStorage.getItem('cookieID') ?? '');
  
  const { isOpen: isHelpOpen, onOpen: openHelp, onClose: closeHelp } = useDisclosure();
  const { isOpen: isStatsOpen, onOpen: openStats, onClose: closeStats } = useDisclosure();
  const { isOpen: isLeaderboardOpen, onOpen: openLeaderboard, onClose: closeLeaderboard } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: openSettings, onClose: closeSettings } = useDisclosure();

  const updateMapping = (newMapping) => {
    localStorage.setItem('mapping', newMapping);
    setKeyboardMap(km => newMapping);
  }

  const updateStats = (roundTimes) => {
    const newStats = {...stats};

    if(roundTimes.length > newStats.statistics.highestRound) {
        newStats.statistics.highestRound = roundTimes.length;
    }
    newStats.statistics.averageRound = (newStats.statistics.totalGames * newStats.statistics.averageRound + roundTimes.length) / (newStats.statistics.totalGames + 1)
    newStats.statistics.totalGames += 1;

    const level = Math.floor(roundTimes.length / 20);
    if(newStats.distribution[level]) {
        newStats.distribution[level] += 1;
    } else {
        newStats.distribution[level] = 1;
    }

    newStats.top10 = [...newStats.top10]
        .concat({
            "date": new Date(), 
            "rounds": roundTimes.length, 
            "averageTime": (roundTimes.length > 0 ? roundTimes.reduce((t, i) => t + i, 0) / roundTimes.length / 1000 : 0),
            "roundTimes": roundTimes.map(rt => (rt / 1000).toFixed(3))
        }).sort((a, b) => {
            if(a.rounds !== b.rounds) {
                return b.rounds - a.rounds;
            }

            return a.averageTime - b.averageTime;
        }).slice(0, 5);

    localStorage.setItem('stats', JSON.stringify(newStats));

    setStats(st => newStats);
  }

  const resetStats = () => {
    const newStats = {"statistics": {"totalGames": 0, "highestRound": 0, "averageRound": 0}, "distribution": {}, "top10": []};
    localStorage.setItem('stats', JSON.stringify(newStats));
    setStats(st => newStats);
  }

  const acceptedCookie = () => {
    let id = localStorage.getItem('cookieID');
    if(id === null) {
      id = uuidv4();
      localStorage.setItem('cookieID', id);
      setCookieID(id);
    }
  }

  const contextValue = {
    keyboardMap,
    updateMapping,
    stats,
    resetStats,
    updateStats,
    isHelpOpen,
    openHelp,
    closeHelp,
    isStatsOpen,
    openStats,
    closeStats,
    isLeaderboardOpen,
    openLeaderboard,
    closeLeaderboard,
    isSettingsOpen,
    openSettings,
    closeSettings,
    cookieID,
    acceptedCookie
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
