export const attributesChips = [
  { id: '1', name: 'Organic' },
  { id: '2', name: 'Reduced fat' },
  { id: '3', name: 'Australian made' },
  { id: '4', name: 'Lite' },
];

export const productDescTitles = [
  {
    label: 'Product name',
    value: 'Dairy Farmers Lite White Reduced Fat Milk'
  },
  {
    label: 'Product description',
    value: `Dairy Farmers Full Cream milk is rich and creamy in taste and contains 100% Aussie milk. Since 1900 our dedicated farmers have proudly shared their high quality nutritious and delicious milk.`
  },
];

export const packagingTitles = [
  {
    label: 'Net contents',
    field: 'netContent',
  },
  {
    label: 'Net content UOM',
    field: 'netContentUom',
  },
  {
    label: 'Multipack',
    field: 'multipack',
  },
  {
    label: 'Quantity of children',
    field: 'quantity',
  }
];

export const organisationTitles = [
  {
    label: 'Company name',
    field: 'companyName',
  },
  {
    label: 'Brand',
    field: 'brand',
  },
  {
    label: 'External reference ID',
    field: 'externalReferenceId',
  },
  {
    label: 'GTIN',
    field: 'barcodeNumber',
  },
  {
    label: 'GLN',
    field: 'GLN',
  }
];

export const tooltipContent = {
  categories: "All categories which this product is currently linked to. These categories are also visible to shoppers and able to be added as shopping list items.",
  attributes: "All attributes currently linked to this product. Attributes are available to Shoppers as product search filters via the Pondrop app.",
  product: "Product and brand information. Descriptions are based on details shown on the product itself or the brand's website and is available to shoppers when searching for products via the Pondrop app.",
  packaging: "Information regarding packaging is used to calculate unit or weight based pricing for a product and affects prices shown and used in the Shoppers' List and Comparison tools.",
  organisation: "Company and Brand information, including GTIN (barcode). All organisation details are searchable to identify products within the Pondrop app (excl. internal or external reference IDs).",
};
