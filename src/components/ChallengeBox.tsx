import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'
import { CompletedChallenges } from './CompletedChallenges';

export function ChallengeBox() {

    // Contextos
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext)

    // Challenge Completed
    function handledChallengesSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    // Challenge Fail
    function handledChallengesFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio!</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>

                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handledChallengesFailed}>
                            Falhei
                        </button>

                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handledChallengesSucceeded}>
                            Completei
                        </button>

                    </footer>
                </div>

            ) : (

                    <div className={styles.challengeNotActive}>
                        <strong> Finalize um ciclo para receber um desafio</strong>

                        <p>
                            <img src="icons/level-up.svg" alt="Level-up" />
                        Suba de level completando desafios
                    </p>

                    </div>
                )}

        </div >
    );
}

