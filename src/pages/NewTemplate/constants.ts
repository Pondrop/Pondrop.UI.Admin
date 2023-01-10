import { addTemplateStepInitialState } from "store/api/tasks/initialState";

// New Template Details field helper values
export const templateTitles = [
  {
    label: 'Description',
    field: 'description',
    value: 'Sample description'
  },
  {
    label: 'Type',
    field: 'type',
    value: 'Sample type'
  },
  {
    label: 'Initiated by',
    field: 'initiatedBy',
    value: 'Sample initiated by'
  },
  {
    label: 'Focus object',
    field: 'focus',
    value: 'Sample focus object'
  }
];

// New Template - Section 2 field helper values
export const selectedFieldsData = [
  {
    label: 'Modal title',
    placeholder: 'Screen title',
    field: 'modalTitle'
  },
  {
    label: 'Modal instructions',
    placeholder: 'e.g. Take a photo of the shelf for this product',
    field: 'modalInstructions'
  },
];

// Input placeholders
export const MANUAL_SUBMISSION_PLACEHOLDER = 'Enter comma separated list of instruction sentences for manual submissions';
export const FIELD_STEP_INSTRUCTION_PLACEHOLDER = 'Enter comma separated list of instructions for completing the task';
export const SUMMARY_SUBMIT_INSTRUCTION_PLACEHOLDER = 'Enter comma separated list of instruction sentences for reviewing task and submitting';

// Product focus field
export const productFocusStep = {
  title: 'Search and add a product',
  isSummary: false,
  fieldDefinitions: [
    {
      id: '2ec0bcdf-340e-4876-89f3-799e6f00e7bb'
    }
  ],
};

// Category focus field
export const categoryFocusStep = {
  title: 'Select Category',
  isSummary: false,
  fieldDefinitions: [
    {
      id: 'bc6eafe0-4272-47c9-95a8-2cb0a6d8a535'
    }
  ],
};

// Comment field
export const commentsStep = {
  title: 'Summary',
  fieldDefinitions: [
    {
      id: '4ed6b03b-e78c-47eb-a5a6-025f4148bc46'
    }
  ],
};
