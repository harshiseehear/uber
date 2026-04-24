import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

const SHEETS_WEB_APP_URL = import.meta.env.VITE_SHEETS_WEB_APP_URL || ''

const QUESTION_SETS = {
  1: {
    q1: {
      title: 'En quelle année les Canadiens de Montréal ont-ils été fondés?',
      options: [
        { value: 'A', label: '1906' },
        { value: 'B', label: '1909' },
        { value: 'C', label: '1914' },
        { value: 'D', label: '1907' },
      ],
      correct: 'B',
    },
    q2: {
      title: 'Quelle gâterie les partisans des Canadiens ont-ils commandée plus de 50 000 fois cette saison?',
      options: [
        { value: 'A', label: 'Lait frappé' },
        { value: 'B', label: 'Chocolats' },
        { value: 'C', label: 'Tiramisu' },
        { value: 'D', label: 'Gâteau au fromage' },
      ],
      correct: 'D',
    },
    q3: {
      title: "Durant les séries éliminatoires de 2025, quel trio (nourriture, produit d'épicerie et produit du quotidien) les partisans des Canadiens ont-ils commandé le plus souvent?",
      options: [
        { value: 'A', label: 'Shawarma, œufs, papier essuie-tout' },
        { value: 'B', label: 'Burgers, bananes, assiettes' },
        { value: 'C', label: 'Ramen, poulet rôti, gomme à mâcher' },
        { value: 'D', label: 'Pizza, fraises, fleurs' },
      ],
      correct: 'D',
    },
    q4: {
      title: 'En quelle année Youppi! est-il devenu la mascotte des Canadiens de Montréal?',
      options: [
        { value: 'A', label: '2000' },
        { value: 'B', label: '2005' },
        { value: 'C', label: '1990' },
        { value: 'D', label: '2009' },
      ],
      correct: 'B',
    },
    q5: {
      title: 'Durant les séries éliminatoires de 2025, les partisans des Canadiens ont commandé plus de 7000 portions de frites, ce qui correspond au :',
      options: [
        { value: 'A', label: 'Nombre de mises au jeu cette saison' },
        { value: 'B', label: "Nombre de matchs de saison régulière disputés dans l'histoire de l'équipe" },
        { value: 'C', label: 'Nombre de minutes en supériorité numérique cette saison' },
        { value: 'D', label: 'Nombre de joueurs ayant porté le chandail du CH' },
      ],
      correct: 'B',
    },
  },
  2: {
    q1: {
      title: "Les Canadiens sont l'équipe de la LNH qui a remporté le plus de coupes Stanley. Combien en ont-ils remporté?",
      options: [
        { value: 'A', label: '18' },
        { value: 'B', label: '32' },
        { value: 'C', label: '27' },
        { value: 'D', label: '24' },
      ],
      correct: 'D',
    },
    q2: {
      title: 'Au cours de cette saison, les partisans montréalais ont commandé plus de 300 000 burgers, un nombre suffisant pour :',
      options: [
        { value: 'A', label: 'Remplir cinq fois la patinoire du Centre Bell' },
        { value: 'B', label: 'Atteindre une hauteur correspondant à plus de 31 tours du stade olympique' },
        { value: 'C', label: 'Correspondre au poids de 1,2 million de rondelles' },
        { value: 'D', label: 'Couvrir toute la longueur de la ligne orange du métro' },
      ],
      correct: 'B',
    },
    q3: {
      title: 'Les soirs où les Canadiens jouent, lequel de ces aliments a été commandé plus de 450 000 fois au cours des deux dernières saisons?',
      options: [
        { value: 'A', label: 'Maïs soufflé' },
        { value: 'B', label: 'Frites' },
        { value: 'C', label: 'Poutine' },
        { value: 'D', label: 'Pomme de terre au four' },
      ],
      correct: 'C',
    },
    q4: {
      title: "Quel entraîneur-chef des Canadiens a mené l'équipe à la conquête de cinq coupes Stanley consécutives entre 1956 et 1960?",
      options: [
        { value: 'A', label: 'Toe Blake' },
        { value: 'B', label: 'Scotty Bowman' },
        { value: 'C', label: 'Dick Irvin' },
        { value: 'D', label: 'Claude Ruel' },
      ],
      correct: 'A',
    },
    q5: {
      title: 'Durant la saison dernière, les partisans des Canadiens ont commandé plus de 150 000 pizzas, un nombre suffisant pour :',
      options: [
        { value: 'A', label: 'Parcourir 50 fois la distance entre le Centre Bell et le Vieux-Port' },
        { value: 'B', label: 'Faire 18 fois le tour de la patinoire du Centre Bell' },
        { value: 'C', label: "Faire deux fois la longueur de la ligne orange du métro" },
        { value: 'D', label: 'Couvrir le belvédère du mont Royal' },
      ],
      correct: 'C',
    },
  },
  3: {
    q1: {
      title: 'Avant le Centre Bell, dans quel aréna les Canadiens ont-ils joué pendant des décennies?',
      options: [
        { value: 'A', label: 'Forum de Montréal' },
        { value: 'B', label: 'Centre Molson' },
        { value: 'C', label: 'Maple Leaf Gardens' },
        { value: 'D', label: 'Stade olympique' },
      ],
      correct: 'A',
    },
    q2: {
      title: "Durant les séries éliminatoires de 2025, les partisans des Canadiens ont passé 3000 commandes d'ailes de poulet, un nombre qui correspond au :",
      options: [
        { value: 'A', label: 'Nombre de secondes dans une période de prolongation en séries éliminatoires' },
        { value: 'B', label: 'Nombre total de minutes en supériorité numérique' },
        { value: 'C', label: 'Nombre de tirs au but' },
        { value: 'D', label: 'Nombre total de mises au jeu cette saison' },
      ],
      correct: 'A',
    },
    q3: {
      title: 'La saison dernière, les partisans des Canadiens ont commandé suffisamment de hot-dogs pour parcourir la distance qui sépare le Centre Bell de quel site emblématique de Montréal?',
      options: [
        { value: 'A', label: 'La basilique Notre-Dame' },
        { value: 'B', label: "Schwartz's Deli sur le boulevard Saint-Laurent (aussi appelé la « Main »)" },
        { value: 'C', label: 'Le stade olympique' },
        { value: 'D', label: 'La croix du mont Royal' },
      ],
      correct: 'B',
    },
    q4: {
      title: 'Le célèbre « Big Three » de la défense des Canadiens dans les années 1970 était composé de Serge Savard, Guy Lapointe et de quel autre défenseur?',
      options: [
        { value: 'A', label: 'Larry Robinson' },
        { value: 'B', label: 'Rod Langway' },
        { value: 'C', label: 'Craig Rivet' },
        { value: 'D', label: 'Chris Chelios' },
      ],
      correct: 'A',
    },
    q5: {
      title: 'Durant les séries éliminatoires de 2025, les partisans des Canadiens ont commandé beaucoup de poutines. Combien de surfaceuses à glace la sauce de ces poutines pourrait-elle remplir?',
      options: [
        { value: 'A', label: '1 resurfaceuse' },
        { value: 'B', label: '3 resurfaceuse' },
        { value: 'C', label: '7 resurfaceuse' },
        { value: 'D', label: '12 resurfaceuse' },
      ],
      correct: 'B',
    },
  },
}

const QUESTION_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5']

const sendToGoogleSheet = async (data) => {
  if (!SHEETS_WEB_APP_URL) return
  try {
    await fetch(SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
    })
  } catch (e) {
    console.error('Sheet logging failed', e)
  }
}

function App() {
  const [step, setStep] = useState('welcome')
  const [selectedSet, setSelectedSet] = useState(null)
  const [answers, setAnswers] = useState({})
  const [isFadingOut, setIsFadingOut] = useState(false)
  const autoResetRef = useRef(null)
  const transitionRef = useRef(null)
  const [timerKey, setTimerKey] = useState(0)

  const questions = selectedSet ? QUESTION_SETS[selectedSet] : null

  const score = questions
    ? QUESTION_KEYS.reduce((s, qk) => s + (answers[qk] === questions[qk].correct ? 1 : 0), 0)
    : 0

  const clearTimers = useCallback(() => {
    if (autoResetRef.current) { clearTimeout(autoResetRef.current); autoResetRef.current = null }
    if (transitionRef.current) { clearTimeout(transitionRef.current); transitionRef.current = null }
  }, [])

  const transitionTo = useCallback((nextStep) => {
    clearTimers()
    setIsFadingOut(true)
    transitionRef.current = setTimeout(() => {
      setStep(nextStep)
      setIsFadingOut(false)
      transitionRef.current = null
    }, 400)
  }, [clearTimers])

  const resetToWelcome = useCallback(() => {
    clearTimers()
    setIsFadingOut(true)
    transitionRef.current = setTimeout(() => {
      setStep('welcome')
      setSelectedSet(null)
      setAnswers({})
      setIsFadingOut(false)
      transitionRef.current = null
    }, 400)
  }, [clearTimers])

  // Auto-reset timer for questions, score, and form screens
  useEffect(() => {
    if (step === 'welcome') return
    clearTimers()
    setTimerKey((k) => k + 1)
    autoResetRef.current = setTimeout(resetToWelcome, 30000)
    return clearTimers
  }, [step, clearTimers, resetToWelcome])

  const handleStart = () => {
    const setNum = Math.floor(Math.random() * 3) + 1
    setSelectedSet(setNum)
    setAnswers({})
    transitionTo('q1')
  }

  const handleAnswer = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value }
    setAnswers(nextAnswers)
    const idx = QUESTION_KEYS.indexOf(questionId)
    if (idx < QUESTION_KEYS.length - 1) {
      transitionTo(QUESTION_KEYS[idx + 1])
    } else {
      const finalScore = QUESTION_KEYS.reduce(
        (s, qk) => s + (nextAnswers[qk] === questions[qk].correct ? 1 : 0),
        0
      )
      const data = {
        datetimestamp: new Date().toISOString(),
        set: selectedSet,
        ...Object.fromEntries(QUESTION_KEYS.map((qk) => [qk, nextAnswers[qk] || ''])),
        score: finalScore,
      }
      sendToGoogleSheet(data)
      transitionTo('results')
    }
  }

  const handleResultsSubmit = () => {
    resetToWelcome()
  }

  const currentQuestion = QUESTION_KEYS.includes(step) && questions ? questions[step] : null
  const questionNumber = QUESTION_KEYS.indexOf(step) + 1

  return (
    <div className="app">
      {/* WELCOME */}
      {step === 'welcome' && (
        <section className={`screen welcome-screen ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          <div className="welcome-content">
            <h1 className="uber-logo"><span className="uber-text">Uber</span><br /><span className="eats-text">Eats</span></h1>
            <p className="welcome-tagline">
              Réponds aux<br />
              questions.<br />
              Gagne presque<br />
              presque tout.
            </p>
          </div>
          <button className="cta-button" onClick={handleStart}>
            Joue maintenant
          </button>
        </section>
      )}

      {/* QUESTIONS */}
      {currentQuestion && (
        <section className={`screen question-screen ${isFadingOut ? 'fade-out' : 'fade-in'}`} key={step}>
          <div className="question-content">
            <h2 className={`question-title${currentQuestion.title.length > 110 ? ' question-title-sm' : ''}`}>Q{questionNumber}: {currentQuestion.title}</h2>
            <div className="option-grid">
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={opt.value}
                  className={`option-card${answers[step] === opt.value ? ' selected' : ''}`}
                  onClick={() => handleAnswer(step, opt.value)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + i)})</span>
                  <span className={`option-text${opt.label.length > 35 ? ' option-text-sm' : ''}`}>{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="timer-bar">
              <span className="timer-fill" key={`timer-${step}-${timerKey}`} />
            </div>
          </div>
        </section>
      )}

      {/* RESULTS */}
      {step === 'results' && questions && (
        <section className={`screen results-screen ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          <div className="results-score-circle">
            <span className="results-score-number">{score}</span>
          </div>
          <h2 className="results-title">
            Prépare-toi à gagner presque presque tout.
          </h2>
          <div className="results-answers">
            {QUESTION_KEYS.map((qk) => {
              const q = questions[qk]
              const userAnswer = answers[qk]
              const isCorrect = userAnswer === q.correct
              const selectedOption = q.options.find((o) => o.value === userAnswer)
              return (
                <div key={qk} className={`result-card ${isCorrect ? 'result-correct' : 'result-wrong'}`}>
                  <span className="result-answer-text">{selectedOption?.label || '—'}</span>
                </div>
              )
            })}
          </div>
          <button className="submit-arrow" onClick={handleResultsSubmit}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="legal-text">
            En participant à ce jeu, vous reconnaissez et acceptez les modalités et conditions
            (disponibles sur demande). L'admissibilité, les détails des prix et le processus de sélection
            sont assujettis au règlement officiel. Aucun achat requis. L'organisateur se réserve le droit
            de modifier, de suspendre ou d'annuler le jeu en tout temps, sans préavis.
          </p>
          <div className="timer-bar">
            <span className="timer-fill" key={`timer-results-${timerKey}`} />
          </div>
        </section>
      )}
    </div>
  )
}

export default App
