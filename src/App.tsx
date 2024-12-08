import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/elements/Header';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { WalletProvider } from './providers/WalletProvider';

function App() {
  return (
    <WalletProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/:slug" element={<GamePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </WalletProvider>
  );
}

export default App;