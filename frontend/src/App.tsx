import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AlertsList from './pages/AlertsList';
import AlertDetail from './pages/AlertDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<AlertsList />} />
          <Route path="/alerts/:id" element={<AlertDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

