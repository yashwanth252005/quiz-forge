import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("quizStarted", "true");

    // Send topic & difficulty to QuizPage
    navigate('/quiz', {
      state: { topic, difficulty },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white" style={{ height: '90vh' }}>
      <h1 className="text-5xl font-bold mb-4">QuizForge 🧠</h1>
      <p className="mb-8 text-lg">Let AI challenge your brain with custom quizzes!</p>

      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter quiz topic (e.g. JavaScript)"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
          required
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white"
        >
          <option value="easy">Easy 🟢</option>
          <option value="medium">Medium 🟡</option>
          <option value="hard">Hard 🔴</option>
        </select>

        <button
          type="submit"
          className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          Start Quiz 🚀
        </button>


      </form>
    </div>
  );
}

export default HomePage;
