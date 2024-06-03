import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./views/LoginPage";
import PostPageHome from "./views/PostPageHome";
import SignupPage from "./views/SignUpPage";


function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PostPageHome/>}/>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/" element={<SignupPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
