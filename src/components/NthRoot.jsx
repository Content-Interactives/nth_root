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
  };

  const handleStep1Check = () => {
    const isCorrect = step1Input === questions[currentQuestion].index;
    setHasError(prev => ({ ...prev, step1: !isCorrect }));
    if (isCorrect) setStep1Complete(true);
  };

  const handleStep2Check = () => {
    const isCorrect = step2Input === questions[currentQuestion].solution;
    setHasError(prev => ({ ...prev, step2: !isCorrect }));
    if (isCorrect) setStep2Complete(true);
  };

  return (
    <div className="bg-gray-100 p-8 w-[780px] overflow-auto">
      <Card className="w-[748px] mx-auto shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg w-[748px]">
          <h1 className="text-sky-900 text-2xl font-bold">Root Learning</h1>
          <p className="text-sky-800">Learn about roots and practice finding them!</p>
        </div>

        <CardContent className="space-y-6 pt-6 w-[748px]">
          {/* Definition Box */}
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">What are Roots?</h2>
            <p className="text-blue-600">
              Roots (represented by √) are the inverse operation of exponents. If you have a number, 
              x raised to the power of n, written as xⁿ, the n-th root of xⁿ will give you back x. 
              Essentially we are asking, "What number, when multiplied by itself a certain number 
              of times, gives us this result?"
            </p>
            <p className="text-blue-600 mt-4">
              If there is a small number before the root symbol, known as the index, it tells us 
              how many times to multiply the number by itself. If there is no number, it is assumed to be 2 (square root).
            </p>
          </div>

          {/* Examples Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Examples</h2>
            <div className="flex space-x-4 mb-4">
              {examples.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedExample(index)}
                  className={`px-4 py-2 rounded ${
                    selectedExample === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Example {index + 1}
                </Button>
              ))}
            </div>
            <Card className="border border-gray-200">
              <CardContent className="p-8 pt-10">
                <p className="text-3xl font-bold mb-6">{examples[selectedExample].problem}</p>
                <p className="text-xl mb-4">Solution: {examples[selectedExample].solution}</p>
                <p>{examples[selectedExample].explanation}</p>
              </CardContent>
            </Card>
          </div>

          {/* Practice Section */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Practice Time!</h2>
              <Button 
                onClick={handleNewQuestion}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                New Question
              </Button>
            </div>

            <div className="text-center text-2xl mb-4">
              <span className="font-bold">{questions[currentQuestion].problem}</span>
            </div>

            <Button 
              onClick={() => {
                setShowAnswer(true);
                setStep1Complete(false);
                setStep2Complete(false);
                setStep1Input('');
                setStep2Input('');
                setHasError({ step1: false, step2: false });
              }}
              className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3"
            >
              Solve Step by Step
            </Button>

            {showAnswer && (
              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <p>1. What is the index of the root?</p>
                <div className="flex items-center gap-4 my-4">
                  {step1Complete ? (
                    <span className="text-green-600 font-medium">{questions[currentQuestion].index}</span>
                  ) : (
                    <Input 
                      type="text"
                      value={step1Input}
                      onChange={(e) => {
                        setStep1Input(e.target.value);
                        setHasError(prev => ({ ...prev, step1: false }));
                      }}
                      className={`w-20 text-center ${
                        hasError.step1 ? 'border-red-500 focus:border-red-500' : 'border-blue-300'
                      }`}
                    />
                  )}
                  {!step1Complete && (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleStep1Check}
                        className="bg-blue-400 hover:bg-blue-500"
                      >
                        Check
                      </Button>
                      <Button
                        onClick={() => setStep1Complete(true)}
                        className="bg-gray-400 hover:bg-gray-500 text-white"
                      >
                        Skip
                      </Button>
                    </div>
                  )}
                </div>

                {step1Complete && (
                  <>
                    <p>2. What number when multiplied by itself {step1Input} times gives you {questions[currentQuestion].number}?</p>
                    <div className="my-4">
                      <div className="flex items-center gap-4 mt-2">
                        {step2Complete ? (
                          <span className="text-green-600 font-medium">{questions[currentQuestion].solution}</span>
                        ) : (
                          <Input 
                            type="text"
                            value={step2Input}
                            onChange={(e) => {
                              setStep2Input(e.target.value);
                              setHasError(prev => ({ ...prev, step2: false }));
                            }}
                            className={`w-20 text-center ${
                              hasError.step2 ? 'border-red-500 focus:border-red-500' : 'border-blue-300'
                            }`}
                          />
                        )}
                        {!step2Complete && (
                          <div className="flex gap-4">
                            <Button
                              onClick={handleStep2Check}
                              className="bg-blue-400 hover:bg-blue-500"
                            >
                              Check
                            </Button>
                            <Button
                              onClick={() => setStep2Complete(true)}
                              className="bg-gray-400 hover:bg-gray-500 text-white"
                            >
                              Skip
                            </Button>
                          </div>
                        )}
                      </div>
                      {step2Complete && (
                        <p className="mt-4">
                          Verification: {questions[currentQuestion].intermediateStep} = {questions[currentQuestion].number}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {step2Complete && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <h3 className="text-green-800 text-xl font-bold">Great Work!</h3>
                    <p className="text-green-700">
                      You've successfully found the root!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-4">
        Understanding roots is essential for mathematics and problem solving!
      </p>
    </div>
  );
};

export default NthRoot;