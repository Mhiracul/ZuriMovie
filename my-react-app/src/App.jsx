import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Details from "./Page/Details";

function App() {
  return (
    <div className=" font-dmsans">
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" exact element={<Home />} />{" "}
            <Route path="/movies/:id" element={<Details />} exact />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
