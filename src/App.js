import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FindPassword from './pages/FindPassword';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';


function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findPassword" element={<FindPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/:userId" element={<Guestbook />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;