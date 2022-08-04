import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import { Layout } from 'components';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
