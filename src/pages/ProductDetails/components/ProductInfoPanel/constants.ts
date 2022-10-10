export const productTitles = [
  {
    field: 'Product',
    label: 'Product name'
  },
  {
    field: 'GTIN',
    label: 'GTIN'
  },
  {
    field: 'GLN',
    label: 'GLN'
  },
  {
    field: 'Company_Name',
    label: 'Company name'
  },
  {
    field: 'Brand',
    label: 'Brand'
  },
  {
    field: 'Net_Content',
    label: 'Net Content'
  },
  {
    field: 'Net_Content_UOM',
    label: 'Net Content UOM' 
  }
];

export const categoryChips = [
  { id: 1, name: 'Dairy' },
  { id: 2, name: 'Milk' },
  { id: 3, name: 'Fullcream Milk' },
];

export const attributesChips = [
  { id: 1, name: 'Organic' },
  { id: 2, name: 'Reduced fat' },
  { id: 3, name: 'Australian made' },
  { id: 3, name: 'Lite' },
];

export const productTestData = [
  {
    label: 'Product name',
    value: 'Dairy Farmers Lite White Reduced Fat Milk'
  },
  {
    label: 'Product description',
    value: `Dairy Farmers Full Cream milk is rich and creamy in taste and contains 100% Aussie milk. Since 1900 our dedicated farmers have proudly shared their high quality nutritious and delicious milk.`
  },
];

export const packagingTestData = [
  {
    label: 'Net contents',
    value: '2'
  },
  {
    label: 'Net content UOM',
    value: 'Litres'
  },
  {
    label: 'Multipack',
    value: 'No'
  },
  {
    label: 'Quantity of children',
    value: '0'
  }
];

export const organisationTestData = [
  {
    label: 'Company name',
    value: 'Dairy Farmers PTY LTD'
  },
  {
    label: 'Brand',
    value: 'Dairy Farmers Milk'
  },
  {
    label: 'External reference ID',
    value: 'ABC1234567'
  },
  {
    label: 'GTIN',
    value: '9429000038225'
  },
  {
    label: 'GLN',
    value: '9429000038225'
  }
];

export const tooltipContent = {
  categories: "All categories which this product is currently linked to. These categories are also visible to shoppers and able to be added as shopping list items.",
  attributes: "All attributes currently linked to this product. Attributes are available to Shoppers as product search filters via the Pondrop app.",
  product: "Product and brand information. Descriptions are based on details shown on the product itself or the brand's website and is available to shoppers when searching for products via the Pondrop app.",
  packaging: "Information regarding packaging is used to calculate unit or weight based pricing for a product and affects prices shown and used in the Shoppers' List and Comparison tools.",
  organisation: "Company and Brand information, including GTIN (barcode). All organisation details are searchable to identify products within the Pondrop app (excl. internal or external reference IDs).",
};
