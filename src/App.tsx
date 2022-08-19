import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Stores from './pages/Stores';
import SidePanel from 'components/SidePanel';
import { DivWrapper } from 'App.styles';

function App() {
  return (
    <BrowserRouter>
      <DivWrapper>
        <SidePanel />
        <Routes>
          <Route path="*" element={<Navigate to="/stores" />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/products" element={<Stores />} />
        </Routes>
      </DivWrapper>
    </BrowserRouter>
  );
}

export default App;
