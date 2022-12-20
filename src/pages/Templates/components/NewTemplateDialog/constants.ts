// New Template Modal field helper values
export const newTemplateTitles = [
  {
    field: 'title',
    label: 'Title',
    placeholder: 'Template name'
  },
  {
    field: 'type',
    label: 'Template type',
    placeholder: '- Select template type -'
  },
  {
    field: 'decription',
    label: 'Description',
    placeholder: 'Template description (subheading)'
  },
  {
    field: 'focus',
    label: 'Focus object',
    placeholder: '- Select template focus object -'
  },
];

// New Template - Template Type field helper values
export const templateTypeData = [
  {
    label: 'Task',
    id: 'type-1'
  },
  {
    label: 'Survey',
    id: 'type-2'
  },
  {
    label: 'Advert',
    id: 'type-3'
  }
];

// Mapping of Template type
export const TEMPLATE_TYPE = {
  'type-1': 'task',
  'type-2': 'survey',
  'type-3': 'advert'
};

// New Template - Template Focus Object field helper values
export const templateFocusObjectData = [
  {
    label: 'Product',
    id: 'focus-1'
  },
  {
    label: 'Category',
    id: 'focus-2'
  },
];

// Mapping of Template focus object
export const FOCUS_TYPE = {
  'focus-1': 'product',
  'focus-2': 'category'
};
