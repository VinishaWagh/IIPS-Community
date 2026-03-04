import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"

function Home(){
  return <h2>Welcome to IIPS Community</h2>
}

function Signup(){
  return <h2>Signup Page</h2>
}

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;