import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EnterId from './pages/EnterId';
import FindPassword from './pages/FindPassword';
import Guestbook from './pages/Guestbook';
import Login from './pages/Login';
import OAuth2RedirectHandler from './pages/Login/OAuth2RedirectHandler';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Readme from './pages/Readme';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import Version from './pages/Version';


function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/enterId" element={<EnterId />} />
        <Route path="/findPassword" element={<FindPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:userId" element={<Guestbook />} />
        <Route path="/readme" element={<Readme />} />
        <Route path="/version" element={<Version />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/kakaoLogin" element={<OAuth2RedirectHandler />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;