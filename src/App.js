import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  // const user = useAxios(`http://localhost:8080/api/auth/signup`);

  const sessionID = sessionStorage.getItem("user_id");
  const guestbookPath = `/${sessionID}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path={guestbookPath} element={<Guestbook page={sessionID} />} />
        <Route path="/jindo" element={<Guestbook page="jindo" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
