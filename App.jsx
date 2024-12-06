import './App.css';
import React, { useState, useEffect } from 'react';
// import { Castle, Star, Clock, Trophy } from 'lucide-react';

const QUESTIONS = {
    culture: [
    { 
        question: "Quelle est la capitale de la France ?",
        options: ["Paris", "Lyon", "Marseille", "Bordeaux"],
        correctAnswer: 0,
        difficulty: "facile"
    },
    { 
        "question": "Quel est le plus grand pays du monde ?", 
        "options": ["Canada", "Russie", "Chine", "États-Unis"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quel est le monument le plus célèbre de Paris ?", 
        "options": ["Louvre", "Tour Eiffel", "Arc de Triomphe", "Notre-Dame"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quelle est la langue officielle du Brésil ?", 
        "options": ["Espagnol", "Portugais", "Français", "Anglais"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quel pays est surnommé 'le pays du soleil levant' ?", 
        "options": ["Chine", "Corée", "Japon", "Thaïlande"],
        "correctAnswer": 2,
        "difficulty": "facile"
    },
    { 
        "question": "Quelle est la capitale de l’Italie ?", 
        "options": ["Florence", "Rome", "Milan", "Venise"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        question: "Qui a peint la Joconde ?",
        options: ["Van Gogh", "Picasso", "Léonard de Vinci", "Monet"],
        correctAnswer: 2,
        difficulty: "moyen"
    },
    { 
        "question": "Qui a écrit 'Les Misérables' ?", 
        "options": ["Balzac", "Hugo", "Zola", "Proust"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Quelle année marque la Révolution française ?", 
        "options": ["1776", "1789", "1804", "1815"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Qui est le fondateur de l'Empire mongol ?", 
        "options": ["Kubilaï Khan", "Tamerlan", "Gengis Khan", "Attila"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    },
    { 
        "question": "Dans quel musée se trouve la Joconde ?", 
        "options": ["Orsay", "Pompidou", "Louvre", "Rodin"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel est l’autre nom de la ville de New York ?", 
        "options": ["Big Ben", "Big Apple", "Windy City", "City of Angels"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    }
    ],
    sports: [
    { 
        question: "Combien de joueurs sur un terrain de football ?", 
        options: ["9", "10", "11", "12"],
        correctAnswer: 2,
        difficulty: "facile"
    },
    { 
        "question": "Combien de joueurs composent une équipe de basketball ?", 
        "options": ["5", "6", "7", "8"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        "question": "Dans quel sport utilise-t-on une balle de tennis ?", 
        "options": ["Badminton", "Tennis", "Baseball", "Golf"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quelle couleur de carte indique une exclusion dans le football ?", 
        "options": ["Jaune", "Rouge", "Bleu", "Noir"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quel pays a inventé le rugby ?", 
        "options": ["Angleterre", "France", "Australie", "Afrique du Sud"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        "question": "Dans quel sport peut-on marquer un essai ?", 
        "options": ["Rugby", "Football", "Hockey", "Baseball"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        question: "Quel pays a remporté la Coupe du Monde 2022 ?", 
        options: ["Brésil", "France", "Argentine", "Allemagne"],
        correctAnswer: 2,
        difficulty: "moyen"
    },
    { 
        "question": "Qui détient le record mondial du 100 mètres ?", 
        "options": ["Usain Bolt", "Carl Lewis", "Tyson Gay", "Asafa Powell"],
        "correctAnswer": 0,
        "difficulty": "moyen"
    },
    { 
        "question": "Combien de grands chelems Roger Federer a-t-il remportés ?", 
        "options": ["18", "20", "22", "24"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Dans quel sport peut-on réaliser un 'strike' ?", 
        "options": ["Tennis", "Bowling", "Golf", "Baseball"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel est le nombre maximal de points au bowling ?", 
        "options": ["200", "250", "300", "350"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    },
    { 
        "question": "En quelle année a eu lieu la première Coupe du Monde de football ?", 
        "options": ["1928", "1930", "1934", "1938"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    }
    ],
    informatique: [
    { 
        question: "Que signifie HTML ?", 
        options: ["High Text Markup Language", "Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: 1,
        difficulty: "facile"
    },
    { 
        "question": "Que signifie CSS ?", 
        "options": ["Cascading Style Sheets", "Code Syntax System", "Central Style System", "Computer Style Sheets"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        "question": "Quel est le langage principal pour créer des pages web ?", 
        "options": ["Java", "HTML", "Python", "C++"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Que signifie HTTP ?", 
        "options": ["HyperText Transfer Protocol", "HyperText Tool Program", "Home Transfer Text Protocol", "High Transfer Text Program"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        "question": "Quel est le système d'exploitation créé par Microsoft ?", 
        "options": ["MacOS", "Linux", "Windows", "Ubuntu"],
        "correctAnswer": 2,
        "difficulty": "facile"
    },
    { 
        "question": "Quel est le langage utilisé pour les bases de données ?", 
        "options": ["SQL", "Java", "HTML", "CSS"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        question: "Qui a créé Linux ?", 
        options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Linus Torvalds"],
        correctAnswer: 3,
        difficulty: "moyen"
    },
    { 
        "question": "Quelle année marque le lancement de Windows 95 ?", 
        "options": ["1994", "1995", "1996", "1997"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Qui a créé le World Wide Web ?", 
        "options": ["Bill Gates", "Linus Torvalds", "Tim Berners-Lee", "Steve Jobs"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel langage est principalement utilisé pour l'intelligence artificielle ?", 
        "options": ["Java", "Python", "PHP", "C#"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel est le système de contrôle de version populaire parmi les développeurs ?", 
        "options": ["Git", "Subversion", "Mercurial", "CVS"],
        "correctAnswer": 0,
        "difficulty": "moyen"
    },
    { 
        "question": "Quelle commande Linux affiche la liste des fichiers ?", 
        "options": ["ls", "cd", "mv", "rm"],
        "correctAnswer": 0,
        "difficulty": "moyen"
    }
    ],
    animaux: [
    { 
        question: "Quel est le plus grand mammifère terrestre ?", 
        options: ["Éléphant", "Girafe", "Rhinocéros", "Hippopotame"],
        correctAnswer: 0,
        difficulty: "facile"
    },
    { 
        "question": "Quel animal est connu comme le roi de la jungle ?", 
        "options": ["Lion", "Tigre", "Éléphant", "Guépard"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        "question": "Combien de pattes a un insecte ?", 
        "options": ["4", "6", "8", "10"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quel est l'animal terrestre le plus rapide ?", 
        "options": ["Guépard", "Lion", "Cheval", "Autruche"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        "question": "Quel oiseau est incapable de voler ?", 
        "options": ["Aigle", "Autruche", "Hirondelle", "Canard"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quel animal est célèbre pour sa mémoire ?", 
        "options": ["Singe", "Chien", "Éléphant", "Dauphin"],
        "correctAnswer": 2,
        "difficulty": "facile"
    },
    { 
        question: "Combien de pattes a une araignée ?", 
        options: ["6", "8", "10", "12"],
        correctAnswer: 1,
        difficulty: "moyen"
    },
    { 
        "question": "Quel est le plus grand animal marin ?", 
        "options": ["Orque", "Requin", "Baleine bleue", "Calamar géant"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    },
    { 
        "question": "Combien de cœurs possède un poulpe ?", 
        "options": ["1", "2", "3", "4"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel est le nom du plus grand reptile vivant ?", 
        "options": ["Anaconda", "Crocodile marin", "Varan de Komodo", "Boa constricteur"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel mammifère peut voler ?", 
        "options": ["Chauve-souris", "Écureuil volant", "Paresseux", "Koala"],
        "correctAnswer": 0,
        "difficulty": "moyen"
    },
    { 
        "question": "Quelle est l'espérance de vie moyenne d'une tortue marine ?", 
        "options": ["50 ans", "70 ans", "100 ans", "150 ans"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    }
    ],
    science: [
    { 
        question: "Quelle est la formule chimique de l'eau ?", 
        options: ["CO2", "H2O", "O2", "NaCl"],
        correctAnswer: 1,
        difficulty: "facile"
    },
    { 
        "question": "Quelle planète est la plus proche du Soleil ?", 
        "options": ["Mercure", "Vénus", "Terre", "Mars"],
        "correctAnswer": 0,
        "difficulty": "facile"
    },
    { 
        "question": "Combien de planètes composent le système solaire ?", 
        "options": ["7", "8", "9", "10"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quel gaz est essentiel à la respiration ?", 
        "options": ["Azote", "Hydrogène", "Oxygène", "Dioxyde de carbone"],
        "correctAnswer": 2,
        "difficulty": "facile"
    },
    { 
        "question": "Quelle est la forme de la Terre ?", 
        "options": ["Plate", "Sphérique", "Cubique", "Triangulaire"],
        "correctAnswer": 1,
        "difficulty": "facile"
    },
    { 
        "question": "Quel est l’état naturel de l’eau à 100°C ?", 
        "options": ["Solide", "Liquide", "Gazeux", "Plasma"],
        "correctAnswer": 2,
        "difficulty": "facile"
    },
    { 
        question: "Qui a théorisé la relativité ?", 
        options: ["Newton", "Galilée", "Einstein", "Hawking"],
        correctAnswer: 2,
        difficulty: "moyen"
    },
    { 
        "question": "Quelle est l’unité de mesure de la force ?", 
        "options": ["Newton", "Joule", "Watt", "Pascal"],
        "correctAnswer": 0,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel est le symbole chimique de l'or ?", 
        "options": ["Au", "Ag", "Fe", "Pb"],
        "correctAnswer": 0,
        "difficulty": "moyen"
    },
    { 
        "question": "Quel scientifique a développé la loi de la gravitation universelle ?", 
        "options": ["Einstein", "Newton", "Galilée", "Copernic"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Quelle est la vitesse de la lumière dans le vide ?", 
        "options": ["3x10^6 m/s", "3x10^8 m/s", "3x10^10 m/s", "3x10^12 m/s"],
        "correctAnswer": 1,
        "difficulty": "moyen"
    },
    { 
        "question": "Quelle molécule est connue comme le sucre de table ?", 
        "options": ["Glucose", "Fructose", "Saccharose", "Lactose"],
        "correctAnswer": 2,
        "difficulty": "moyen"
    }
    ]
};

const QuizFantastique = () => {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [gameState, setGameState] = useState('configuration');
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Sélection des questions
    const selectQuestions = () => {
        const filteredQuestions = QUESTIONS[category].filter(
            q => q.difficulty === difficulty
        );
        setCurrentQuestions(filteredQuestions);
        setGameState('playing');
        setTimer(30);
    };

    // Logique de jeu similaire à l'exemple précédent
    useEffect(() => {
    let interval;
    if (gameState === 'playing' && timer > 0) {
        interval = setInterval(() => {
        setTimer(prev => prev - 1);
        }, 1000);
    } else if (timer === 0) {
        handleGameOver();
    }
    return () => clearInterval(interval);
    }, [gameState, timer]);

    const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    
    if (optionIndex === currentQuestions[currentQuestionIndex].correctAnswer) {
        setScore(prev => prev + 1);
    }

    setTimeout(() => {
        nextQuestion();
    }, 1000);
    };

    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < currentQuestions.length) {
            setCurrentQuestionIndex(nextIndex);
            setSelectedAnswer(null);
            setTimer(30);
        } else {
            handleGameOver();
        }
    };

    const handleGameOver = () => {
    setGameState('finished');
    setTimer(0);
    };

    const resetGame = () => {
    setGameState('configuration');
    setScore(0);
    setCurrentQuestionIndex(0);
    setCategory('');
    setDifficulty('');
    setCurrentQuestions([]);
    setSelectedAnswer(null);
    setTimer(30);
    };

    const renderContent = () => {
    switch(gameState) {
        case 'configuration':
        return (
            <div className="quiz-container">
            <h1 className="quiz-title">🧙‍♂️ Quiz Fantastique 🏰</h1>
            
            <div className="configuration-section">
                <h2>Choisissez votre Quête</h2>
                
                <div className="category-selection">
                <h3>Domaine de Connaissance</h3>
                {Object.keys(QUESTIONS).map(cat => (
                    <button 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`category-btn ${category === cat ? 'selected' : ''}`}
                    >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
                </div>

                <div className="difficulty-selection">
                <h3>Niveau de Difficulté</h3>
                {['facile', 'moyen'].map(diff => (
                    <button 
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`difficulty-btn ${difficulty === diff ? 'selected' : ''}`}
                    >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                ))}
                </div>

                <button 
                onClick={selectQuestions}
                disabled={!category || !difficulty}
                className="start-quest-btn"
                >
                Commencer la Quête
                </button>
            </div>
            </div>
        );

        case 'playing':
        const currentQuestion = currentQuestions[currentQuestionIndex];
        return (
            <div className="quiz-container playing-container">
            <div className="quiz-header">
                <span className="score">Score: {score}</span>
                <span className="timer">⏰ {timer} s</span>
            </div>

            <h2 className="question-text">{currentQuestion.question}</h2>

            <div className="answers-grid">
                {currentQuestion.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`answer-btn 
                    ${selectedAnswer === index 
                        ? (index === currentQuestion.correctAnswer 
                        ? 'correct' 
                        : 'incorrect')
                        : ''}`}
                >
                    {option}
                </button>
                ))}
            </div>
            </div>
        );

        case 'finished':
        return (
            <div className="quiz-container result-container">
            <h1>🏆 Quête Terminée !</h1>
            <p>Votre Score : {score} / {currentQuestions.length}</p>
            <button onClick={resetGame} className="restart-btn">
                Nouvelle Aventure
            </button>
            </div>
        );
    }
    };

    return (
    <div className="fantasy-background">
        {renderContent()}
    </div>
    );
};

export default QuizFantastique;