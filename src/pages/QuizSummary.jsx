import React from 'react';

const QuizSummary = ({ score, total, onRestart, onReview }) => {

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Summary</h1>
            <p className="text-lg mb-2">You scored {score} out of {total}</p>
            <button
                onClick={onRestart}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Restart Quiz
            </button>
            <button
                onClick={onReview}
                className="mt-4 ml-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
                Review Answers
            </button>

        </div>
    );
};

export default QuizSummary;
