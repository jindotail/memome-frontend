import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EnterId from './pages/EnterId/EnterId';
import FindPassword from './pages/FindPassword/FindPassword';
import Guestbook from './pages/Guestbook/Guestbook';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Readme from './pages/Readme/Readme';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Signup from './pages/Signup/Signup';
import Version from './pages/Version/Version';


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
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;