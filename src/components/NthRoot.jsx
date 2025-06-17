import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const NthRoot = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [step1Input, setStep1Input] = useState('');
  const [step2Input, setStep2Input] = useState('');
  const [hasError, setHasError] = useState({
    step1: false,
    step2: false
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showNavigationButtons, setShowNavigationButtons] = useState(false);
  const [navigationDirection, setNavigationDirection] = useState(null);
  const [stepSkipped, setStepSkipped] = useState({
    step1: false,
    step2: false
  });

  const examples = [
    {
      problem: "√16",
      solution: "4",
      explanation: "To find the square root of 16, we ask: what number times itself equals 16? 4 × 4 = 16, so √16 = 4"
    },
    {
      problem: "∛27",
      solution: "3",
      explanation: "For a cube root, we ask: what number used three times as a factor equals 27? 3 × 3 × 3 = 27, so ∛27 = 3"
    },
    {
      problem: "∜16",
      solution: "2",
      explanation: "For a fourth root, we ask: what number used four times as a factor equals 16? 2 × 2 × 2 × 2 = 16, so ∜16 = 2"
    }
  ];

  const questions = [
    { problem: "√25", index: "2", number: "25", intermediateStep: "5 × 5", solution: "5" },
    { problem: "∛8", index: "3", number: "8", intermediateStep: "2 × 2 × 2", solution: "2" },
    { problem: "√49", index: "2", number: "49", intermediateStep: "7 × 7", solution: "7" },
    { problem: "∛125", index: "3", number: "125", intermediateStep: "5 × 5 × 5", solution: "5" },
    { problem: "√36", index: "2", number: "36", intermediateStep: "6 × 6", solution: "6" },
    { problem: "∛27", index: "3", number: "27", intermediateStep: "3 × 3 × 3", solution: "3" },
    { problem: "√64", index: "2", number: "64", intermediateStep: "8 × 8", solution: "8" },
    { problem: "∛216", index: "3", number: "216", intermediateStep: "6 × 6 × 6", solution: "6" },
    { problem: "√81", index: "2", number: "81", intermediateStep: "9 × 9", solution: "9" },
    { problem: "∛1000", index: "3", number: "1000", intermediateStep: "10 × 10 × 10", solution: "10" },
    { problem: "√100", index: "2", number: "100", intermediateStep: "10 × 10", solution: "10" },
    { problem: "∛64", index: "3", number: "64", intermediateStep: "4 × 4 × 4", solution: "4" },
    { problem: "∜16", index: "4", number: "16", intermediateStep: "2 × 2 × 2 × 2", solution: "2" },
    { problem: "∜81", index: "4", number: "81", intermediateStep: "3 × 3 × 3 × 3", solution: "3" },
    { problem: "∜256", index: "4", number: "256", intermediateStep: "4 × 4 × 4 × 4", solution: "4" },
    { problem: "∜625", index: "4", number: "625", intermediateStep: "5 × 5 × 5 × 5", solution: "5" },
    { problem: "∜1296", index: "4", number: "1296", intermediateStep: "6 × 6 × 6 × 6", solution: "6" },
    { problem: "∜2401", index: "4", number: "2401", intermediateStep: "7 × 7 × 7 × 7", solution: "7" }
  ];

  const handleNewQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
    setStep1Complete(false);
    setStep2Complete(false);
    setStep1Input('');
    setStep2Input('');
    setHasError({ step1: false, step2: false });
    setCurrentStepIndex(0);
    setShowNavigationButtons(false);
    setNavigationDirection(null);
    setStepSkipped({ step1: false, step2: false });
  };

  const handleStep1Check = () => {
    const isCorrect = step1Input === questions[currentQuestion].index;
    setHasError(prev => ({ ...prev, step1: !isCorrect }));
    if (isCorrect) {
      setStep1Complete(true);
      setStepSkipped(prev => ({ ...prev, step1: false }));
    }
  };

  const handleStep2Check = () => {
    const isCorrect = step2Input === questions[currentQuestion].solution;
    setHasError(prev => ({ ...prev, step2: !isCorrect }));
    if (isCorrect) {
      setStep2Complete(true);
      setStepSkipped(prev => ({ ...prev, step2: false }));
    }
  };

  const skipStepOne = () => {
    setStep1Input(questions[currentQuestion].index);
    setStep1Complete(true);
    setStepSkipped(prev => ({ ...prev, step1: true }));
  };

  const skipStepTwo = () => {
    setStep2Input(questions[currentQuestion].solution);
    setStep2Complete(true);
    setStepSkipped(prev => ({ ...prev, step2: true }));
  };

  const handleNavigateHistory = (direction) => {
    setNavigationDirection(direction);
    
    if (direction === 'back' && currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else if (direction === 'forward' && currentStepIndex < 1) {
      setCurrentStepIndex(prev => prev + 1);
    }

    setTimeout(() => {
      setNavigationDirection(null);
    }, 300);
  };

  React.useEffect(() => {
    if (step1Complete && step2Complete) {
      setShowNavigationButtons(true);
    }
  }, [step1Complete, step2Complete]);

  return (
    <>
      <style>{`
        @property --r {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        .glow-button { 
          min-width: auto; 
          height: auto; 
          position: relative; 
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: all .3s ease;
          padding: 7px;
        }

        .glow-button::before {
          content: "";
          display: block;
          position: absolute;
          background: #fff;
          inset: 2px;
          border-radius: 4px;
          z-index: -2;
        }

        .simple-glow {
          background: conic-gradient(
            from var(--r),
            transparent 0%,
            rgb(0, 255, 132) 2%,
            rgb(0, 214, 111) 8%,
            rgb(0, 174, 90) 12%,
            rgb(0, 133, 69) 14%,
            transparent 15%
          );
          animation: rotating 3s linear infinite;
          transition: animation 0.3s ease;
        }

        .simple-glow.stopped {
          animation: none;
          background: none;
        }

        @keyframes rotating {
          0% {
            --r: 0deg;
          }
          100% {
            --r: 360deg;
          }
        }

        .nav-button {
          opacity: 1;
          cursor: default !important;
          position: relative;
          z-index: 2;
          outline: 2px white solid;
        }

        .nav-button-orbit {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(
            from var(--r),
            transparent 0%,
            rgb(0, 255, 132) 2%,
            rgb(0, 214, 111) 8%,
            rgb(0, 174, 90) 12%,
            rgb(0, 133, 69) 14%,
            transparent 15%
          );
          animation: rotating 3s linear infinite;
          z-index: 0;
        }

        .nav-button-orbit::before {
          content: "";
          position: absolute;
          inset: 2px;
          background: transparent;
          border-radius: 50%;
          z-index: 0;
        }

        .nav-button svg {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className="w-[500px] h-auto mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#5750E3] text-sm font-medium select-none">Root Learning</h2>
            <Button 
              onClick={handleNewQuestion}
              className="bg-[#008545] hover:bg-[#00703d] text-white px-4 h-[32px] flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Root
            </Button>
          </div>

          <div className="text-center text-xl mb-4">
            <span className="font-mono">{questions[currentQuestion].problem}</span>
          </div>

          <div className={`glow-button ${showAnswer ? 'simple-glow stopped' : 'simple-glow'}`}>
            <Button 
              onClick={() => {
                setShowAnswer(true);
                setStep1Complete(false);
                setStep2Complete(false);
                setStep1Input('');
                setStep2Input('');
                setHasError({ step1: false, step2: false });
                setCurrentStepIndex(0);
                setShowNavigationButtons(false);
                setNavigationDirection(null);
                setStepSkipped({ step1: false, step2: false });
              }}
              className="w-full bg-[#008545] hover:bg-[#00703d] text-white py-2 rounded"
            >
              Solve Step by Step
            </Button>
          </div>
        </div>

        {showAnswer && (
          <div className="bg-gray-50">
            <div className="p-4 space-y-4">
              <div className="w-full p-2 mb-1 bg-white border border-[#5750E3]/30 rounded-md">
                {currentStepIndex === 0 && (
                  <>
                    <p className="text-sm mb-2">Step 1: What is the index of the root?</p>
                    <div className="space-y-2">
                      {!step1Complete ? (
                        <>
                          <div className={`flex items-center border rounded-md overflow-hidden relative ${
                            hasError.step1 ? 'border-yellow-500' : ''
                          }`}>
                            <Input 
                              type="text"
                              value={step1Input}
                              onChange={(e) => {
                                setStep1Input(e.target.value);
                                setHasError(prev => ({ ...prev, step1: false }));
                              }}
                              placeholder="Enter the index"
                              className={`w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                                hasError.step1 ? 'bg-yellow-50' : ''
                              }`}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <div className="glow-button simple-glow">
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleStep1Check}
                                  className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md"
                                >
                                  Check
                                </Button>
                                <Button
                                  onClick={skipStepOne}
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md"
                                >
                                  Skip
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center mb-4">
                            <span className="font-medium text-[#008545]">
                              {step1Input}
                            </span>
                          </div>
                          {!showNavigationButtons && (
                            <div className="flex justify-end items-center gap-2">
                              {!stepSkipped.step1 && (
                                <span className="text-green-600 font-medium">Great Job!</span>
                              )}
                              <div className="glow-button simple-glow">
                                <Button
                                  onClick={() => setCurrentStepIndex(1)}
                                  className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md"
                                >
                                  Continue
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}

                {currentStepIndex === 1 && step1Complete && (
                  <>
                    <p className="text-sm mb-2">Step 2: What number when multiplied by itself {step1Input} times gives you {questions[currentQuestion].number}?</p>
                    <div className="space-y-2">
                      {!step2Complete ? (
                        <>
                          <div className={`flex items-center border rounded-md overflow-hidden relative ${
                            hasError.step2 ? 'border-yellow-500' : ''
                          }`}>
                            <Input 
                              type="text"
                              value={step2Input}
                              onChange={(e) => {
                                setStep2Input(e.target.value);
                                setHasError(prev => ({ ...prev, step2: false }));
                              }}
                              placeholder="Enter your answer"
                              className={`w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                                hasError.step2 ? 'bg-yellow-50' : ''
                              }`}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <div className="glow-button simple-glow">
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleStep2Check}
                                  className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md"
                                >
                                  Check
                                </Button>
                                <Button
                                  onClick={skipStepTwo}
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md"
                                >
                                  Skip
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center mb-4">
                            <span className="font-medium text-[#008545]">
                              {step2Input}
                            </span>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                            <h3 className="text-green-800 text-xl font-bold">Great Work!</h3>
                            <p className="text-green-700">
                              You've successfully found the root!
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 mt-4">
                <div
                  className="nav-orbit-wrapper"
                  style={{
                    position: 'relative',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    visibility: showNavigationButtons && currentStepIndex > 0 ? 'visible' : 'hidden',
                    opacity: showNavigationButtons && currentStepIndex > 0 ? 1 : 0,
                    pointerEvents: showNavigationButtons && currentStepIndex > 0 ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <div className="nav-button-orbit"></div>
                  <div style={{ position: 'absolute', width: '32px', height: '32px', borderRadius: '50%', background: 'white', zIndex: 1 }}></div>
                  <button
                    onClick={() => handleNavigateHistory('back')}
                    className={`nav-button w-8 h-8 flex items-center justify-center rounded-full bg-[#008545]/20 text-[#008545] hover:bg-[#008545]/30 relative z-50`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-500 min-w-[100px] text-center">
                  Step {currentStepIndex + 1} of 2
                </span>
                <div
                  className="nav-orbit-wrapper"
                  style={{
                    position: 'relative',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    visibility: showNavigationButtons && currentStepIndex < 1 ? 'visible' : 'hidden',
                    opacity: showNavigationButtons && currentStepIndex < 1 ? 1 : 0,
                    pointerEvents: showNavigationButtons && currentStepIndex < 1 ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <div className="nav-button-orbit"></div>
                  <div style={{ position: 'absolute', width: '32px', height: '32px', borderRadius: '50%', background: 'white', zIndex: 1 }}></div>
                  <button
                    onClick={() => handleNavigateHistory('forward')}
                    className={`nav-button w-8 h-8 flex items-center justify-center rounded-full bg-[#008545]/20 text-[#008545] hover:bg-[#008545]/30 relative z-50`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NthRoot;