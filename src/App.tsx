
import  { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import List from './pages/List';
import Test from './pages/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regi" element={<Register />} />
      <Route path="/list" element={<List />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
