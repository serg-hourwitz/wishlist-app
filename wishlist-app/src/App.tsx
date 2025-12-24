import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WishesProvider } from './context/WishesContext';
import DashboardPage from './pages/DashboardPage';
import WishPage from './pages/WishPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <WishesProvider>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/wish/:id" element={<WishPage />} />
        </Routes>
      </WishesProvider>
    </BrowserRouter>
  );
}

export default App;
