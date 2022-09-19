import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { Categories, CategoryDetails, Products, ProductDetails, Stores, StoreDetails } from './pages';
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
          <Route path="/products/:product_id" element={<ProductDetails />} />
          <Route path="/products/categories" element={<Categories />} />
          <Route path="/products/categories/:category_id" element={<CategoryDetails />} />
        </Routes>
      </DivWrapper>
    </BrowserRouter>
  );
}

export default App;
