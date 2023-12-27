import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./Components/Create";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Create />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
