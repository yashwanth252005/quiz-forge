import React, { useEffect, useState } from "react";
import { getQuizQuestions } from "../api/openai";
import ReviewAnswers from '../pages/ReviewAnswers';
import { useNavigate, useLocation } from "react-router-dom";

const TIMER_DURATION = 15; // seconds

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const location = useLocation();
  const topic = location.state?.topic || "Java"; // fallback to Java if undefined
  const difficulty = location.state?.difficulty || "easy";


  const navigate = useNavigate();

  // Handle review mode if coming from another page
  useEffect(() => {
    if (location.state?.reviewAnswers) {
      setUserAnswers(location.state.reviewAnswers);
      setShowReview(true);
    }
  }, [location.state]);

  // Fetch quiz questions
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const data = await getQuizQuestions(topic, difficulty);

      setQuestions(data);
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Navigate to result page after finishing all questions
  useEffect(() => {
    if (currentIndex >= questions.length && questions.length > 0 && !showReview) {
      navigate("/result", {
        state: {
          score,
          total: questions.length,
          answers: userAnswers,
        },
      });
    }
  }, [currentIndex, questions.length, score, userAnswers, navigate, showReview]);

  // Handle answer selection
  const handleAnswer = (key) => {
    setSelectedAnswer(key);

    const isCorrect = key === questions[currentIndex].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentIndex].question,
        options: questions[currentIndex].options,
        correctAnswer: questions[currentIndex].answer,
        selectedAnswer: key,
      },
    ]);

    setTimeout(() => {
      handleNextQuestion();
    }, 500);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimeLeft(TIMER_DURATION);
    setCurrentIndex((prev) => prev + 1);
  };

  const progressPercent = (timeLeft / TIMER_DURATION) * 100;
  const question = questions[currentIndex];

  // ----------------------------
  // Conditional UI rendering
  // ----------------------------

  let content = null;

  if (loading) {
    content = (
      <div className="p-4 text-center text-lg">Generating quiz with AI...</div>
    );
  } else if (showReview) {
    content = (
      <ReviewAnswers
        answers={userAnswers}
        onBack={() => navigate('/')}
      />
    );
  } else if (questions.length === 0) {
    content = (
      <div className="p-4 text-center text-lg">No questions available.</div>
    );
  } else if (currentIndex < questions.length) {
    content = (
      <div className="p-6 max-w-xl mx-auto">
        <div className="mb-4">
          <div className="font-bold text-xl">Question {currentIndex + 1}</div>
          <p className="text-lg text-white mt-2">{question.question}</p>
        </div>

        // Display options as buttons
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(question.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswer(key)}
              className={`p-3 rounded-xl border text-left text-black transition-all
                ${selectedAnswer
                  ? key === question.answer
                    ? "bg-green-200 border-green-500"
                    : key === selectedAnswer
                      ? "bg-red-200 border-red-500"
                      : "bg-white border-gray-300"
                  : "bg-white border-gray-300 hover:bg-blue-50"
                }`}
              disabled={selectedAnswer !== null}
            >
              <span className="font-bold">{key}</span>. {value}
            </button>
          ))}
        </div>

        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-blue-500 transition-all duration-1000 ease-linear animate-pulse"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="text-sm text-gray-500 mt-2">Time left: {timeLeft}s</div>
      </div>
    );
  }

  return content;
};

export default QuizPage;
