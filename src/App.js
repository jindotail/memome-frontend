import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login page />} />
        <Route path="/signup" element={<Signup page />} />
        <Route path="/tail" element={<Guestbook page="tail" />} />
        <Route path="/jindo" element={<Guestbook page="jindo" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
