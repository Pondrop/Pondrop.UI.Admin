import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar, Icon } from 'components';
import GlobalStyles from 'globalStyles';
import { lightTheme } from 'theme';
import avatar1 from 'assets/images/avatar1.png';
import avatar2 from 'assets/images/avatar2.png';
import avatar3 from 'assets/images/avatar3.png';
import avatar4 from 'assets/images/avatar4.png';
import { ReactComponent as IconProfile } from 'assets/icons/icon-profile.svg';
import { ReactComponent as IconPencil } from 'assets/icons/icon-pencil.svg';

export default {
  title: 'UI/Avatar',
  component: Avatar,
  argTypes: {
    variant: {
      options: ['square', 'roundedCorners'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <>
    <GlobalStyles />
    <Avatar {...args} />
  </>
);

export const ImageAvatar = Template.bind({});
ImageAvatar.args = {
  avatars: [avatar1],
};
export const ImageAvatarCustomSize = Template.bind({});
ImageAvatarCustomSize.args = {
  avatars: [avatar2],
  width: '30px',
  height: '30px',
};
export const ImageAvatarVariant = Template.bind({});
ImageAvatarVariant.args = {
  avatars: [avatar3],
  variant: 'roundedCorners',
};
export const LetterAvatarInitials = Template.bind({});
LetterAvatarInitials.args = {
  initials: 'ST',
};
export const LetterAvatarInitialsBgColor = Template.bind({});
LetterAvatarInitialsBgColor.args = {
  initials: 'ST',
  bgColor: lightTheme.bgDark,
};
export const LetterAvatarInitialsCustomSize = Template.bind({});
LetterAvatarInitialsCustomSize.args = {
  initials: 'ST',
  width: '30px',
  height: '30px',
  bgColor: lightTheme.secondary,
};
export const LetterAvatarName = Template.bind({});
LetterAvatarName.args = {
  name: 'Kent Dodds',
};
export const LetterAvatarNameCustomSize = Template.bind({});
LetterAvatarNameCustomSize.args = {
  name: 'Jed Watson',
  width: '30px',
  height: '30px',
  bgColor: lightTheme.secondaryAccent,
};
export const LetterAvatarCustomLetterSize = Template.bind({});
LetterAvatarCustomLetterSize.args = {
  name: 'Kent Dodds',
  width: '30px',
  height: '30px',
  fontSize: '12px',
  bgColor: lightTheme.textExtraLight,
};
export const LetterAvatarCustomLetterColor = Template.bind({});
LetterAvatarCustomLetterColor.args = {
  name: 'Kent Dodds',
  fontColor: lightTheme.textWhite,
};
export const IconAvatar = Template.bind({});
IconAvatar.args = {
  icon: (
    <Icon strokeColor={lightTheme.bgWhite}>
      <IconPencil />
    </Icon>
  ),
};
export const IconAvatarCustomSize = Template.bind({});
IconAvatarCustomSize.args = {
  icon: (
    <Icon fillColor={lightTheme.bgWhite}>
      <IconProfile width="20px" />
    </Icon>
  ),
  width: '30px',
  height: '30px',
};
export const IconAvatarBgColor = Template.bind({});
IconAvatarBgColor.args = {
  icon: (
    <Icon fillColor={lightTheme.bgWhite}>
      <IconProfile width="40px" />
    </Icon>
  ),
  width: '60px',
  height: '60px',
  bgColor: lightTheme.bgDark,
};
export const AvatarGroup = Template.bind({});
AvatarGroup.args = {
  avatars: [avatar1, avatar2, avatar3, avatar4],
};
