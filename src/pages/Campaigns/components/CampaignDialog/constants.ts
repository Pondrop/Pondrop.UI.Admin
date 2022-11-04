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

export const initialModalData = {
  name: '',
  campaignType: '',
  template: ''
};
