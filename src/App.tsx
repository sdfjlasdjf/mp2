import { Routes, Route, Navigate } from 'react-router-dom';
import ListView from './pages/ListView';
import GalleryView from './pages/GalleryView';
import DetailView from './pages/DetailView';
import styles from './App.module.css';
import Navbar from './components/Navbar';
import { SelectionProvider } from './state/SelectionContext';

export default function App() {
  return (
    <SelectionProvider>
      <div className={styles.app}>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<ListView />} />
            <Route path="/gallery" element={<GalleryView />} />
            <Route path="/pokemon/:id" element={<DetailView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <div className="container small">
            Built with React + TypeScript + Axios + React Router · Data from PokeAPI · MP2 template
          </div>
        </footer>
      </div>
    </SelectionProvider>
  );
}
