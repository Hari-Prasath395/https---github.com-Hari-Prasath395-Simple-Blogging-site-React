import Navbar from "./components/navbar/Navbar";
import CreatePost from "./screens/create/CreatePost";
import Home from "./screens/home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Postdetails from "./screens/postdetails/Postdetails";
import EditPost from "./screens/edit/EditPost";
import Themeswitch from "./components/switch/Themeswitch";
import { useThemeContext } from "./hooks/useThemeContext";
import './App.css'

function App() {

  const{theme}= useThemeContext();
  return (
    <div className={`App ${theme}bg`}>
      <Router>
        <Navbar />
        <Themeswitch/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<Postdetails />} />
            <Route path="/edit/:id" element={<EditPost/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
