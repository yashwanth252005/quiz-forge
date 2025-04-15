import React from 'react';

const ReviewAnswers = ({ answers, onBack }) => {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Review Answers</h1>

            {answers.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded-xl">
                    <p className="font-semibold mb-2">
                        {index + 1}. {item.question}
                    </p>
                    {Object.entries(item.options).map(([key, value]) => {
                        const isCorrect = key === item.correctAnswer;
                        const isSelected = key === item.selectedAnswer;

                        return (
                            <div
                                key={key}
                                className={`p-2 rounded-md mb-1 
                  ${isCorrect ? 'bg-green-100 text-black' : ''}
                  ${isSelected && !isCorrect ? 'bg-red-100 text-black' : ''}
                `}
                            >
                                <strong>{key}</strong>. {value}
                            </div>
                        );
                    })}
                </div>
            ))}

            <div className="text-center">
                <button
                    onClick={onBack}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ReviewAnswers;
