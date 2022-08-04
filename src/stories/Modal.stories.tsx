import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../components/Modal/Modal';
import GlobalStyles from '../globalStyles';

export default {
  title: 'UI/Modal',
  component: Modal,
  argTypes: {
    animationType: {
      options: ['grow', 'top', 'bottom', 'left', 'right', 'fadeIn'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <>
    <GlobalStyles />
    <Modal {...args} />;
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};
export const DefaultAnimation = Template.bind({});
DefaultAnimation.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  animate: true,
};
export const AnimationTypeGrow = Template.bind({});
AnimationTypeGrow.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  animationType: 'grow',
};
export const AnimationTypeTop = Template.bind({});
AnimationTypeTop.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  animationType: 'top',
};
export const AnimationTypeBottom = Template.bind({});
AnimationTypeBottom.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  animationType: 'bottom',
};
export const AnimationTypeLeft = Template.bind({});
AnimationTypeLeft.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  animationType: 'left',
};
export const AnimationTypeRight = Template.bind({});
AnimationTypeRight.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  animationType: 'right',
};
export const AnimationTypeFadeIn = Template.bind({});
AnimationTypeFadeIn.args = {
  heading: 'Modal heading 1',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  animationType: 'fadeIn',
};
export const LongContent = Template.bind({});
LongContent.args = {
  heading: 'Modal heading 2',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis orci a massa congue mattis. Sed viverra congue mauris et aliquam. Quisque viverra dolor nunc, ut semper sem interdum at. Proin porttitor, justo sit amet dictum placerat, quam nisi finibus sem, sed consectetur ex diam sed metus. Phasellus nibh dui, bibendum sit amet fermentum vel, sagittis sit amet erat. Sed sed pretium nisl, vel facilisis mauris. Praesent in dolor facilisis, varius libero eu, mattis lacus. Ut nunc lectus, vulputate ac consequat et, vehicula sit amet magna. Nullam et urna accumsan, rutrum sapien eu, viverra lacus. Proin scelerisque suscipit fringilla. Vestibulum pulvinar leo sit amet semper blandit. Nunc vel consectetur sem. Etiam congue orci non nulla imperdiet dapibus et eget elit. Morbi a nisi nec nulla porta interdum at sed ipsum. Proin aliquet metus leo, in finibus justo facilisis a. In rhoncus eget metus sit amet pretium.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis orci a massa congue mattis. Sed viverra congue mauris et aliquam. Quisque viverra dolor nunc, ut semper sem interdum at. Proin porttitor, justo sit amet dictum placerat, quam nisi finibus sem, sed consectetur ex diam sed metus. Phasellus nibh dui, bibendum sit amet fermentum vel, sagittis sit amet erat. Sed sed pretium nisl, vel facilisis mauris. Praesent in dolor facilisis, varius libero eu, mattis lacus. Ut nunc lectus, vulputate ac consequat et, vehicula sit amet magna. Nullam et urna accumsan, rutrum sapien eu, viverra lacus. Proin scelerisque suscipit fringilla. Vestibulum pulvinar leo sit amet semper blandit. Nunc vel consectetur sem. Etiam congue orci non nulla imperdiet dapibus et eget elit. Morbi a nisi nec nulla porta interdum at sed ipsum. Proin aliquet metus leo, in finibus justo facilisis a. In rhoncus eget metus sit amet pretium.',
};
export const NestedModal = Template.bind({});
NestedModal.args = {
  heading: 'Modal heading',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  childModalVisibility: true,
  childHeading: 'Child Modal heading',
  childContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};
