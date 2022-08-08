import { ComponentStory, ComponentMeta } from '@storybook/react';

import GlobalStyles from '../globalStyles';
import { lightTheme } from '../theme';
import { ReactComponent as IconProfile } from '../assets/icons/icon-profile.svg';
import Tooltip from '../components/Tooltip';

const SampleComponent = ({ children }: any) => {
  return <div style={{ position: 'relative', top: '20px', left: '100px' }}>{children}</div>;
};

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      options: ['left', 'right', 'bottom'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <>
    <GlobalStyles />
    <SampleComponent>
      <Tooltip {...args} />
    </SampleComponent>
  </>
);

export const BasicTooltip = Template.bind({});
BasicTooltip.args = {
  label: 'Profile',
  children: <IconProfile />,
};
export const ArrowTooltip = Template.bind({});
ArrowTooltip.args = {
  label: 'Profile',
  children: <IconProfile />,
  arrow: true,
};
export const PositionedTooltip = Template.bind({});
PositionedTooltip.args = {
  label: 'Profile',
  children: <IconProfile />,
  position: 'bottom',
};
export const CustomTooltipBackground = Template.bind({});
CustomTooltipBackground.args = {
  label: 'Profile',
  children: <IconProfile />,
  position: 'right',
  arrow: true,
  background: lightTheme.primary,
};
export const CustomTooltipWidth = Template.bind({});
CustomTooltipWidth.args = {
  label: 'Profile',
  children: <IconProfile />,
  position: 'right',
  background: lightTheme.primary,
  width: '200px',
};
export const CustomTooltipMessageFontSize = Template.bind({});
CustomTooltipMessageFontSize.args = {
  label: 'Profile',
  children: <IconProfile />,
  position: 'right',
  background: lightTheme.primary,
  fontSize: '20px',
  arrow: true,
};
export const CustomTooltipMessageFontColor = Template.bind({});
CustomTooltipMessageFontColor.args = {
  label: 'Profile',
  children: <IconProfile />,
  position: 'right',
  background: lightTheme.primary,
  fontColor: lightTheme.textBlack,
};
