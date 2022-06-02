import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Guestbook from './pages/Guestbook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tail" element={<Guestbook page="tail" />} />
        <Route path="/jindo" element={<Guestbook page="jindo" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
