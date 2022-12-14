import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { LicenseInfo } from '@mui/x-license-pro';

import {
  Campaigns,
  Categories,
  CategoryDetails,
  NewCampaign,
  NewTemplate,
  Products,
  ProductDetails,
  Stores,
  StoreDetails,
  SubmittedTasks,
  SubmissionDetails,
  Templates,
} from './pages';
import SidePanel from 'components/SidePanel';
import { DivWrapper } from 'App.styles';

LicenseInfo.setLicenseKey(
  'fc952579b57377b5167cfbeaa8c5b0d6Tz01NDQ1MSxFPTE3MDAxOTM0MTM0MDgsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

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
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/new" element={<NewCampaign />} />
          <Route path="/submissions" element={<SubmittedTasks />} />
          <Route path="/submissions/:submission_id" element={<SubmissionDetails />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/new" element={<NewTemplate />} />
        </Routes>
      </DivWrapper>
    </BrowserRouter>
  );
}

export default App;
