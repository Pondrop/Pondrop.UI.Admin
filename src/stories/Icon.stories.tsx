import { ComponentStory, ComponentMeta } from '@storybook/react';

import Icon from '../components/Icon/Icon';
import GlobalStyles from '../globalStyles';
import { lightTheme } from '../theme';

import { ReactComponent as IconProfile } from '../assets/icons/icon-profile.svg';
import { ReactComponent as IconPencil } from '../assets/icons/icon-pencil.svg';

export default {
  title: 'UI/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => (
  <>
    <GlobalStyles />
    <Icon {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  children: <IconProfile />,
};
export const PrimaryPath = Template.bind({});
PrimaryPath.args = {
  children: <IconProfile />,
  fillColor: lightTheme.primary,
};
export const SecondaryPath = Template.bind({});
SecondaryPath.args = {
  children: <IconProfile />,
  fillColor: lightTheme.secondary,
};
export const PrimaryStroke = Template.bind({});
PrimaryStroke.args = {
  children: <IconPencil />,
  strokeColor: lightTheme.primary,
};
export const SecondaryStroke = Template.bind({});
SecondaryStroke.args = {
  children: <IconPencil />,
  strokeColor: lightTheme.secondary,
};
