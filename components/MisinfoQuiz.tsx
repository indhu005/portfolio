'use client'
import { useState } from 'react'

interface QuizQuestion {
  id: number
  image: string
  claim: string
  answer: boolean
  explanation: string
  source: string
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    image: '/images/misinfo/quiz-1.jpg',
    claim: 'This photo shows recent flooding in Seattle caused by climate change.',
    answer: false,
    explanation: 'This is a manipulated image. The original photo was taken in 2015 and shows a different location.',
    source: 'Reverse image search reveals original context'
  },
  {
    id: 2,
    image: '/images/misinfo/quiz-2.jpg',
    claim: 'Breaking: New study shows drinking coffee reduces cancer risk by 50%.',
    answer: false,
    explanation: 'Misleading headline. The study showed correlation, not causation, and only applied to a specific type of cancer in a small sample.',
    source: 'Original study context missing'
  },
  {
    id: 3,
    image: '/images/misinfo/quiz-3.jpg',
    claim: 'Screenshot of a verified Twitter account announcing major policy change.',
    answer: false,
    explanation: 'The verification badge was digitally added. The account doesn\'t exist.',
    source: 'Visual manipulation detected'
  },
  {
    id: 4,
    image: '/images/misinfo/quiz-4.jpg',
    claim: 'This graph accurately represents unemployment data from government sources.',
    answer: false,
    explanation: 'The Y-axis is manipulated to exaggerate trends. Official data shows a different pattern.',
    source: 'Bureau of Labor Statistics comparison'
  },
  {
    id: 5,
    image: '/images/misinfo/quiz-5.jpg',
    claim: 'Quote from a public figure shared on social media.',
    answer: false,
    explanation: 'Fabricated quote. No record of this statement in speeches, interviews, or public records.',
    source: 'Fact-checking database search'
  }
]

export default function MisinfoQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setIsComplete(false)
  }

  const question = questions[currentQuestion]

  if (isComplete) {
    return (
      <div style={{
        backgroundColor: '#1C1917',
        borderRadius: '16px',
        padding: '48px 32px',
        textAlign: 'center',
        color: '#FFFFFF',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>
          {score === 5 ? '🎉' : score >= 3 ? '👍' : '💪'}
        </div>
        <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', fontFamily: 'var(--font-fraunces), serif' }}>
          You got {score} out of {questions.length}
        </div>
        <div style={{ fontSize: '16px', color: '#9CA3AF', marginBottom: '32px', lineHeight: '1.6' }}>
          {score === 5 && "Perfect! You're great at spotting misinformation."}
          {score === 4 && "Great job! You have a strong eye for false content."}
          {score === 3 && "Not bad! Keep practicing your verification skills."}
          {score < 3 && "Good start! Verification is a skill that improves with practice."}
        </div>
        <button
          onClick={handleRestart}
          style={{
            padding: '14px 32px',
            backgroundColor: '#FFF44F',
            color: '#1C1917',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      {/* Progress bar */}
      <div style={{
        height: '4px',
        backgroundColor: '#E5E7EB',
        width: '100%',
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#7EB3F5',
          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Question counter */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid #E5E7EB',
        fontSize: '14px',
        fontWeight: 600,
        color: '#6B7280',
      }}>
        Question {currentQuestion + 1} of {questions.length}
      </div>

      {/* Image placeholder */}
      <div style={{
        width: '100%',
        height: '320px',
        backgroundColor: '#E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9CA3AF',
        fontSize: '14px',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <div style={{ fontSize: '48px' }}>📷</div>
        <div>Image placeholder</div>
        <div style={{ fontSize: '12px', textAlign: 'center', padding: '0 20px' }}>
          Replace with: {question.image}
        </div>
      </div>

      {/* Claim */}
      <div style={{
        padding: '24px',
        borderBottom: showExplanation ? '1px solid #E5E7EB' : 'none',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#1C1917',
          lineHeight: '1.5',
          marginBottom: showExplanation ? '0' : '24px',
        }}>
          {question.claim}
        </div>

        {/* Buttons */}
        {!showExplanation && (
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
          }}>
            <button
              onClick={() => handleAnswer(true)}
              style={{
                flex: 1,
                padding: '16px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ✓ True
            </button>
            <button
              onClick={() => handleAnswer(false)}
              style={{
                flex: 1,
                padding: '16px',
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ✕ False
            </button>
          </div>
        )}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div style={{
          padding: '24px',
          backgroundColor: selectedAnswer === question.answer ? '#F0FDF4' : '#FEF2F2',
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: selectedAnswer === question.answer ? '#10B981' : '#EF4444',
            marginBottom: '12px',
          }}>
            {selectedAnswer === question.answer ? '✓ Correct!' : '✕ Incorrect'}
          </div>
          <div style={{
            fontSize: '15px',
            color: '#1C1917',
            lineHeight: '1.6',
            marginBottom: '8px',
          }}>
            {question.explanation}
          </div>
          <div style={{
            fontSize: '13px',
            color: '#6B7280',
            fontStyle: 'italic',
          }}>
            Source: {question.source}
          </div>
          <button
            onClick={handleNext}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#1C1917',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}
