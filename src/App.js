import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthRoute from './components/utils/AuthRoute';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  // const user = useAxios(`http://localhost:8080/api/auth/signup`);

  const currentUrl = window.location.href;
  const currentPageName = currentUrl.slice(22);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/:userId" element={<AuthRoute component={<Guestbook page={currentPageName} />} />} /> */}
        <Route path="/:userId" element={<Guestbook page={currentPageName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
