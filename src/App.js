import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { getCookie } from './hooks/cookie';
import useAxios from './hooks/userAxios';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  // const user = useAxios(`http://localhost:8080/api/auth/signup`);

  const cookieID = getCookie("user_id");
  const guestbookPath = `/${cookieID}`;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path={guestbookPath} element={<Guestbook page={cookieID} />} />
        <Route path="/jindo" element={<Guestbook page="jindo" />} />
        {/* {user.map(comment => (
          <Route path={guestbookPath} element={<Guestbook page={sessionID} />} />
        ))} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
