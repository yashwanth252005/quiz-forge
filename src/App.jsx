import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import HeaderPage from './pages/HeaderPage';
import MobileWarning from './pages/MobileWarning ';  // Adjust the import path

function App() {

  const isMobile = window.innerWidth < 768; // you can adjust this breakpoint

  if (isMobile) {
    return <MobileWarning />;
  }


  return (
    <>
      <Router>
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
          <HeaderPage />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;






