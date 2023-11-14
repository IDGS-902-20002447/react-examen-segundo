import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Characters from './components/Resultados';
import Detalle from './components/Detalle';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/detalle/:id" element={<Detalle />} />
      </Routes>
    </Router>
  );
}

export default App;
