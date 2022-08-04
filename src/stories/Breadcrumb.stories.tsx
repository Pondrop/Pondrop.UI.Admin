import { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { ReactComponent as IconHome } from '../assets/icons/icon-home.svg';
import { ReactComponent as IconGallery } from '../assets/icons/icon-gallery.svg';
import { ReactComponent as IconFolder } from '../assets/icons/icon-folder.svg';
import { ReactComponent as IconChevron } from '../assets/icons/icon-chevron.svg';

export default {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  links: [
    { label: 'Home', url: '#' },
    { label: 'Breadcrumb1', url: '#' },
    { label: 'Breadcrumb2', url: '#' },
    { label: 'Breadcrumb3', url: '#' },
  ],
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  links: [
    { label: 'Home', url: '#', image: <IconHome /> },
    { label: 'Breadcrumb1', url: '#', image: <IconGallery /> },
    { label: 'Breadcrumb2', url: '#', image: <IconFolder /> },
    { label: 'Breadcrumb3', url: '#' },
  ],
};

export const StringSeparator = Template.bind({});
StringSeparator.args = {
  links: [
    { label: 'Home', url: '#' },
    { label: 'Breadcrumb1', url: '#' },
    { label: 'Breadcrumb2', url: '#' },
    { label: 'Breadcrumb3', url: '#' },
  ],
  separator: '-',
};

export const SVGSeparator = Template.bind({});
SVGSeparator.args = {
  links: [
    { label: 'Home', url: '#' },
    { label: 'Breadcrumb1', url: '#' },
    { label: 'Breadcrumb2', url: '#' },
    { label: 'Breadcrumb3', url: '#' },
  ],
  separator: <IconChevron />,
};

export const CustomSeparator = Template.bind({});
CustomSeparator.args = {
  links: [
    { label: 'Breadcrumb1', url: '#' },
    { label: 'Breadcrumb2', url: '#' },
    { label: 'Breadcrumb3', url: '#' },
    { label: 'Breadcrumb3', url: '#' },
  ],
  customSeparator: true,
};
