import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Landing from './components/Landing.js';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>

      <main>
        <Routes>
          <Route path="/" element={Landing()}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;