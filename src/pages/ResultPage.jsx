import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure data passed via navigate
  const { score, total, answers } = location.state || {};

  // If user landed here directly, redirect to home
  if (!score && !total) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">🎉 Quiz Completed!</h2>
        <p className="text-xl mb-4">
          You scored
          {score / total == 1 ? (
            <span className="text-green-400"> Perfect 🎉</span>
          ) : (score / total > 0.5 ? (<span className="text-green-400"> Good 👍</span>) : (<span className="text-red-400"> Poor 😢</span>))}
        </p>
        <div className="text-4xl font-bold text-green-400">{score} / {total}</div>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => { sessionStorage.removeItem('quizStarted'); navigate('/quiz') }}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Restart Quiz 🔁
          </button>

          <button
            onClick={() => {
              sessionStorage.removeItem('quizStarted'); navigate('/quiz', {
                state: { reviewAnswers: answers }
              })
            }}
            className="w-full py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
          >
            Review Answers 📋
          </button>

          <button
            onClick={() => { sessionStorage.removeItem('quizStarted'); navigate('/') }}
            className="w-full py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition"
          >
            Back to Home 🏠
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
