import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./views/LoginPage";
import PostPageHome from "./views/PostPageHome";
import SignupPage from "./views/SignUpPage";
import PostPageAdd from "./views/PostPageAdd";
import PostPageDetails from "./views/PostPageDetails";
import PostPageUpdate from "./views/PostPageUpdate";
import CustomerFeedback from './views/CustomerFeedback';
import { Container } from 'react-bootstrap';
import InboxPage from "./views/InboxPage";

function App(){
  return(
     <>
     <Container className='bg-custom'>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PostPageHome/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path = "/add" element ={<PostPageAdd/>} />
      <Route path = "/post/:id" element ={<PostPageDetails/>}/>
      <Route path = "/update/:id" element ={<PostPageUpdate/>} />
      <Route path = "/feedback" element ={<CustomerFeedback/>}/>
      <Route path = "/inbox" element = {<InboxPage/>}/>
    </Routes>
    </BrowserRouter>
     </Container>
    </>
  );
}

export default App;


