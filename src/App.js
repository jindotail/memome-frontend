import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter basename='/guest-book-frontend'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:userId" element={<Guestbook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
