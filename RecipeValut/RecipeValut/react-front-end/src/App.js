import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>

      <main>
        <Routes>
          <Route path="/"/>
        </Routes>
      </main>
    </div>
  );
}

export default App;