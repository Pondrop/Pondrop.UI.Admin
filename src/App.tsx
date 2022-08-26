import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { Products, Stores, StoreDetails } from './pages';
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
          <Route path="/stores/:store_id" element={<StoreDetails />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </DivWrapper>
    </BrowserRouter>
  );
}

export default App;
