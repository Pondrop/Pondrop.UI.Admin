import { Story } from '@storybook/react';

import ButtonGroup from '../components/ButtonGroup';

import Button from '../components/Button';

export default {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
};

const Template: Story = (args) => (
  <ButtonGroup gap={args.gap} {...args}>
    {args.children}
  </ButtonGroup>
);

export const Stacked = Template.bind({});
Stacked.args = {
  gap: 10,
  children: (
    <>
      <Button label="Button One" variant="contained" wide centered color="primary" />
      <Button label="Button Two" variant="contained" wide centered color="primary" />
      <Button label="Button Three" variant="contained" wide centered color="primary" />
    </>
  ),
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
  gap: 40,
  children: (
    <>
      <Button label="Button One" variant="contained" wide centered color="primary" />
      <Button label="Button Two" variant="contained" wide centered color="primary" />
      <Button label="Button Three" variant="contained" wide centered color="primary" />
    </>
  ),
};
