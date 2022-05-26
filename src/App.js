import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Guestbook from './pages/Guestbook';

function App() {
  return (
    <BrowserRouter>
      <Guestbook />
    </BrowserRouter>
  );
}

export default App;
