export const campaignInfoTitles = [
  {
    field: 'name',
    label: 'Campaign title'
  },
  {
    field: 'campaignType',
    label: 'Campaign type'
  },
  {
    field: 'template',
    label: 'Template'
  },
];

export const campaignTypeId = {
  'task': 'Task Campaign',
  'orchestration': 'Orchestration Campaign',
};

export const campaignTemplateId = {
  '68a1ddc7-4d18-4cad-9fa9-23fde3dea96c': 'Category Products',
  'b2a08e75-fb6a-4ad6-a0af-fe98f1f8de07': 'Shelf Stock Levels',
  '575040cb-3196-4a5a-a9c5-4355b99a8604': 'Price',
  '3941f848-d07d-4876-92fc-3df89e3e73aa': 'Quick Price & Quantity'
};

export const tooltipContent = {
  campaign: 'Campaign title and type will not be visible to shoppers. If the details are incorrect, cancel and create a new campaign.',
  product: 'Click back to view or modify the products selected for this campaign',
  category: 'Click back to modify the category selected for this campaign',
  store: 'Click back to view or modify the stores selected for this campaign',
  completion: 'The campaign will only be visible to shoppers at stores until the completion targets are met. For new products we recommend 5 completions per product per store. For established products we recommend 2-3. You can modify this as the campaign progresses.',
  startDate: 'The campaign will start on this date and the associated tasks will be visible at eligible stores from this point.',
  endDate: 'The campaign will close on this date and no longer be visible to any shoppers or stores.'
};
