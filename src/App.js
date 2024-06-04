import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./views/LoginPage";
import PostPageHome from "./views/PostPageHome";
import SignupPage from "./views/SignUpPage";
import PostPageAdd from "./views/PostPageAdd";
import PostPageDetails from "./views/PostPageDetails";
import PostPageUpdate from "./views/PostPageUpdate";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PostPageHome/>}/>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/" element={<SignupPage/>}/>
      <Route path = "/add" element ={<PostPageAdd/>} />
      <Route path = "/post/:id" element ={<PostPageDetails/>}/>
      <Route path = "/update/:id" element ={<PostPageUpdate/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
