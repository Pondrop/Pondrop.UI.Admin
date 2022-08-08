import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormInputText from '../components/FormInputText';
import GlobalStyles from '../globalStyles';

export default {
  title: 'Forms/InputText',
  component: FormInputText,
} as ComponentMeta<typeof FormInputText>;

const Template: ComponentStory<typeof FormInputText> = (args) => (
  <>
    <GlobalStyles />
    <FormInputText {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  name: 'test',
};
export const ShowError = Template.bind({});
ShowError.args = {
  name: 'test',
  hasError: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: 'test',
  label: 'Label*',
};

export const WithLabelShowError = Template.bind({});
WithLabelShowError.args = {
  name: 'test',
  label: 'Label*',
  hasError: true,
};
export const WithFloatingLabel = Template.bind({});
WithFloatingLabel.args = {
  name: 'test',
  label: 'Placeholder*',
  floatingLabel: true,
};

export const WithFloatingLabelShowError = Template.bind({});
WithFloatingLabelShowError.args = {
  name: 'test',
  label: 'Placeholder*',
  hasError: true,
  floatingLabel: true,
};
