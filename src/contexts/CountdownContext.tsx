import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
    minutes:number,
    seconds:number,
    hasFinished:boolean,
    isActive:boolean,
    startCountdown: () => void,
    resetCountdown: () => void,
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }) {

    const { startNewChallenge } = useContext(ChallengesContext);
    let countdownTimeout: NodeJS.Timeout;

    // Define os minutos e segundos em suas propriedades
    const [time, setTime] = useState(60 * 25);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Ativar ao clicar
    function startCountdown() {
        setIsActive(true)
    }

    //Reseta o contador
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(60 * 25);
    }

    // Temporizador
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)

            // Final do temporizador
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}