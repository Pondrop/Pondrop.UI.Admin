// Add Campaign field helper values
export const campaignTitles = [
  {
    field: 'title',
    label: 'Campaign title',
    placeholder: 'Campaign title'
  },
  {
    field: 'type',
    label: 'Campaign type',
    placeholder: '- Select type -'
  },
  {
    field: 'template',
    label: 'Template',
    placeholder: '- Select template -'
  },
];

// Campaign Type values
export const campaignTypeData = [
  {
    id: 'task',
    name: 'Task campaign'
  },
  {
    id: 'orchestration',
    name: 'Orchestration campaign'
  }
];

// Initial state of Add Campaign modal
export const initialModalData = {
  name: '',
  campaignType: '',
  template: ''
};
