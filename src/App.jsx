import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<ProblemList />} />
        <Route path="/problem/:problemId" element={<ProblemDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;