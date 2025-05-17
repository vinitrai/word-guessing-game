import { useState, useEffect, useRef } from 'react'
import { categories } from './categories'
// import './index.css'
import clsx from 'clsx'
import { getFarewellText, getRandomWord } from './utils'
import Confetti from 'react-confetti'

export default function App() {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz'
    const [word, setWord] = useState(() => getRandomWord())

    const [guess, setGuess] = useState([])
    const [attemptsLeft, setAttemptsLeft] = useState(categories.length + 1)
    const buttonRef = useRef(null)
    const gameLost = attemptsLeft == 0 && word.split('').some(w => !guess.includes(w))
    const gameWon = attemptsLeft >= 0 && word.split('').every(w => guess.includes(w))
    const isGameOver = gameLost || gameWon
    const wrongGuesses = guess.filter(letter => !word.includes(letter))
    const lastGuessed = guess[guess.length - 1]
    const isLastCharWrong = lastGuessed && !word.includes(guess[guess.length - 1])

    const categoryElements = categories.map((cat, index) => {
        const isCategoryLost = index < wrongGuesses.length
        const className = clsx(isCategoryLost && 'lost')
        return <span key={`${cat}-${index}`} style={{ color: cat.color, backgroundColor: cat.backgroundColor }} className={className}>{cat.name}</span>
    })

    const letterElements = word.split('').map((letter, index) => {
        const isGuessed = guess.includes(letter.toLowerCase());
        const shouldReveal = isGameOver || isGuessed;

        const className = clsx('letter', {
            guessed: isGuessed,
            missed: !isGuessed && isGameOver && gameLost
        })


        return (
            <span key={`${letter}-${index}`} className={className}>
                {shouldReveal ? letter.toUpperCase() : ''}
            </span>
        );
    });
    const keyboardElements = alphabets.split('').map((char, index) => {
        const isGuessed = guess.includes(char);
        const isCorrect = word.includes(char);

        const className = clsx('key', {
            correct: isGuessed && isCorrect,
            wrong: isGuessed && !isCorrect
        });

        return (
            <button
                key={`${char}-${index}`}
                data-char={char}
                className={className}
                disabled={isGameOver}
            >
                {char.toUpperCase()}
            </button>
        );
    });





    function handleGuess(char) {
        if (attemptsLeft) {
            setGuess(prevGuess => prevGuess.includes(char) ? prevGuess : [...prevGuess, char])
        }

        setAttemptsLeft(prev => {
            return prev > 1 ? prev - 1 : 0
        })
    }
    const className = clsx('game-banner', {
        lost: gameLost,
        won: gameWon,
        farewell: !isGameOver && isLastCharWrong
    })
    function getBanner() {
        if (!isGameOver && isLastCharWrong) {
            const catIndex = wrongGuesses.length > 0 ? wrongGuesses.length - 1 : 0
            return (
                <p>{getFarewellText(categories[catIndex].name)}</p>
            )
        }
        if (gameWon) {
            return (
                <>
                    <h2>You Won!</h2>
                    <p>Well Done</p>
                </>
            )
        }
        if (gameLost) {
            return (
                <>
                    <h2>Sorry,You Lost</h2>
                    <p>Try to improve !</p>
                </>
            )
        }
        return null
    }
    function resetGame() {
        setWord(getRandomWord())
        setGuess([])
        setAttemptsLeft(categories.length + 1)
    }
    useEffect(() => {
        const keyboardSection = document.querySelector('.keyboard');

        const handleKeyboardClick = (e) => {
            const button = e.target.closest('button[data-char]');
            if (button && keyboardSection.contains(button)) {
                const char = button.getAttribute('data-char');
                handleGuess(char);
            }
        };

        keyboardSection.addEventListener('click', handleKeyboardClick);

        return () => {
            keyboardSection.removeEventListener('click', handleKeyboardClick);
        };
    }, []);


    // Scroll to the Play Again button when gameOver is true
    useEffect(() => {
        if (isGameOver && buttonRef.current) {
            buttonRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [isGameOver]);

    return (
        <>
            <section className="confetti-section">
                <div className="container">
                    <section className="confetti">
                        {
                            gameWon && <Confetti width={window.innerWidth} numberOfPieces={300} />
                        }
                    </section>
                </div>
            </section>

            <header>
                <div className='container'>
                    <section className="header-content">
                        <h1>Word Guessing Game</h1>
                        <p>Attempts Left : {attemptsLeft}</p>
                    </section>
                </div>
            </header>

            <main>
                {/* game section */}
                <section className="game-section">
                    <div className="container">
                        <section className={className}>
                            {
                                getBanner()
                            }
                        </section>
                    </div>
                </section>
                {/* category section */}
                <section className="category-section">
                    <div className="container">
                        <section className='category'>
                            {
                                categoryElements
                            }
                        </section>
                    </div>
                </section>
                {/* word section */}
                <section className="word-section">
                    <div className="container">
                        <section className='word'>
                            {
                                letterElements
                            }
                        </section>
                    </div>
                </section>
                {/* keyboard secttion */}
                <section className="keyboard-section">
                    <div className="container">
                        <section className='keyboard'>
                            {
                                keyboardElements
                            }
                        </section>
                    </div>
                </section>
                {/* reset section */}
                <section className="reset-section">
                    <div className="container">
                        <section className="game-reset" ref={buttonRef}>
                            {
                                isGameOver && <button onClick={resetGame}>Play Again</button>
                            }

                        </section>
                    </div>
                </section>

            </main>



        </>
    )
}