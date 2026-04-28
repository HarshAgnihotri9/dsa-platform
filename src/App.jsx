import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateProblem from "./pages/CreateProblem";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-problem" element={<CreateProblem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route path="/topics/:topicId" element={<ProtectedRoute><ProblemList /> </ProtectedRoute>} />
        <Route path="/problem/:problemId" element={ <ProtectedRoute><ProblemDetail /></ProtectedRoute>} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;