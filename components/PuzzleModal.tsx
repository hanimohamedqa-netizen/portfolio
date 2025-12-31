'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Puzzle {
  question: string;
  answer: string;
  hint: string;
  options: { label: string; value: string }[];
}

interface PuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

const puzzles: Puzzle[] = [
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: 'A',
    hint: "Think about sound! 🔊",
    options: [
      { label: 'Echo', value: 'A' },
      { label: 'Shadow', value: 'B' },
      { label: 'Cloud', value: 'C' },
    ]
  },
  {
    question: "If you're in a race and you pass the person in 2nd place, what place are you in now?",
    answer: 'B',
    hint: "You took their position! 🏃",
    options: [
      { label: '1st place', value: 'A' },
      { label: '2nd place', value: 'B' },
      { label: '3rd place', value: 'C' },
    ]
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: 'A',
    hint: "Think about walking! 👣",
    options: [
      { label: 'Footsteps', value: 'A' },
      { label: 'Money', value: 'B' },
      { label: 'Time', value: 'C' },
    ]
  },
  {
    question: "What has keys but no locks, space but no room, and you can enter but can't go inside?",
    answer: 'B',
    hint: "You use it every day! ⌨️",
    options: [
      { label: 'A house', value: 'A' },
      { label: 'A keyboard', value: 'B' },
      { label: 'A piano', value: 'C' },
    ]
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: 'A',
    hint: "Look at the letters in each word! 🔤",
    options: [
      { label: 'The letter M', value: 'A' },
      { label: 'The letter O', value: 'B' },
      { label: 'The letter E', value: 'C' },
    ]
  },
  {
    question: "I'm light as a feather, yet the strongest person can't hold me for 5 minutes. What am I?",
    answer: 'B',
    hint: "Try holding it! 😮",
    options: [
      { label: 'A balloon', value: 'A' },
      { label: 'Your breath', value: 'B' },
      { label: 'A thought', value: 'C' },
    ]
  }
];

export default function PuzzleModal({ isOpen, onClose, onSuccess }: PuzzleModalProps) {
  const [step, setStep] = useState<'puzzle' | 'name' | 'success'>('puzzle');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [usedPuzzleIndices, setUsedPuzzleIndices] = useState<number[]>([0]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [userName, setUserName] = useState('');

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    if (selectedAnswer === currentPuzzle.answer) {
      // Correct answer!
      setStep('name');
      setShowError(false);
    } else {
      // Wrong answer
      setAttempts(attempts + 1);

      if (attempts >= 1) {
        // Second attempt failed, give them the CV anyway
        setStep('name');
      } else {
        // First attempt failed, try a different puzzle
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          setSelectedAnswer('');

          // Get a new random puzzle that hasn't been used
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * puzzles.length);
          } while (usedPuzzleIndices.includes(newIndex));

          setCurrentPuzzleIndex(newIndex);
          setUsedPuzzleIndices([...usedPuzzleIndices, newIndex]);
        }, 2000);
      }
    }
  };

  const handleNameSubmit = () => {
    if (!userName.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    setStep('success');
    setTimeout(() => {
      onSuccess(userName.trim());
      onClose();
      // Reset state for next time
      setTimeout(() => {
        setStep('puzzle');
        setCurrentPuzzleIndex(0);
        setUsedPuzzleIndices([0]);
        setSelectedAnswer('');
        setShowError(false);
        setAttempts(0);
        setUserName('');
      }, 500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-bold">
                  {step === 'puzzle' && '🧩 Brain Teaser Challenge'}
                  {step === 'name' && '✨ Almost There!'}
                  {step === 'success' && '🎉 Success!'}
                </h2>
                <p className="text-indigo-100 mt-1">
                  {step === 'puzzle' && 'Solve the riddle to download the CV'}
                  {step === 'name' && 'Just need your name'}
                  {step === 'success' && 'Download starting...'}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'puzzle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Question */}
                    <div className="mb-6">
                      <p className="text-lg text-gray-800 font-medium leading-relaxed">
                        {currentPuzzle.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                      {currentPuzzle.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSelectedAnswer(option.value);
                            setShowError(false);
                          }}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            selectedAnswer === option.value
                              ? 'border-indigo-600 bg-indigo-50 shadow-md'
                              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className="font-semibold text-indigo-600 mr-2">{option.value})</span>
                          <span className="text-gray-700">{option.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {showError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                        >
                          <div className="flex items-start gap-2">
                            <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-800">
                              {attempts === 0 ? "Not quite! Let's try a different riddle..." : "Good effort! You can still download the CV."}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={!selectedAnswer}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>

                    {attempts > 0 && (
                      <p className="text-center text-sm text-gray-500 mt-3">
                        Attempt {attempts + 1} of 2
                      </p>
                    )}
                  </motion.div>
                )}

                {step === 'name' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {selectedAnswer === currentPuzzle.answer && (
                      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-green-800">Brilliant! You solved it! 🎉</p>
                        </div>
                      </div>
                    )}

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors mb-4"
                      autoFocus
                    />

                    <button
                      onClick={handleNameSubmit}
                      disabled={!userName.trim()}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Download CV
                    </button>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 size={64} className="text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-600">Your download will start shortly...</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
