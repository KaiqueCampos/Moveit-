import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

    const {level} = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://i.pinimg.com/736x/b4/2e/d8/b42ed890afff0ac0c44378ee9ee3d97c.jpg" alt="Kaique Campos" />

            <div>
                <strong>Kaique Campos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>

    )
}