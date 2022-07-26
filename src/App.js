import "./App.css";
import Signup from "./components/signup";
import Signin from "./components/signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="*" element={<Signin />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
