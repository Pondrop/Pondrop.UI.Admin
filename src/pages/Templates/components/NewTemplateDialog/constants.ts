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

export const TEMPLATE_TYPE = {
  'type-1': 'task',
  'type-2': 'survey',
  'type-3': 'advert'
};

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

export const FOCUS_TYPE = {
  'focus-1': 'product',
  'focus-2': 'category'
};
