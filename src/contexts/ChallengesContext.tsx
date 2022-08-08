import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengeCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: Challenge,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
}

// Propriedades do tipo children -> ReactNode
interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {

    // ?? -> if not exist, is equal to...
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    // Experience Calc
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    /**
    * Receber notificações
    * useEffect com ,[] -> será executada uma unica vez quando exibido em tela
    */
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    // Salvar os dados em cookies
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    }, [level, currentExperience, challengeCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    // Iniciar um novo Challenge
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio 🔥', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    // Reseta o edsafio
    function resetChallenge() {
        setActiveChallenge(null);
    }

    // Completar um desafio
    function completeChallenge() {

        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        // Let -> é uma varíavel (pode mudar seu valor a qualquer momento)
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengeCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}

            { isLevelUpModalOpen && <LevelUpModal />
            }
        </ChallengesContext.Provider>
    )
}