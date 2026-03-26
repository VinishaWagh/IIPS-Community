import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function Home(){
  return <h2>Welcome to IIPS Community</h2>
}

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={
          <ProtectedRoute>
            <Feed />
            </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;