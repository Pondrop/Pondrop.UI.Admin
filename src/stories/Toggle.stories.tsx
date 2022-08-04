import { ComponentStory, ComponentMeta } from '@storybook/react';

import GlobalStyles from '../globalStyles';

import Toggle from '../components/Toggle/Toggle';
export default {
  title: 'Forms/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => (
  <>
    <GlobalStyles />
    <Toggle {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
};

export const Seconday = Template.bind({});
Seconday.args = {
  color: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
