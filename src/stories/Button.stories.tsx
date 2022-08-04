import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ReactComponent as IconProfile } from '../assets/icons/icon-profile.svg';
import { ReactComponent as IconChevron } from '../assets/icons/icon-chevron.svg';

import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';

import { lightTheme } from '../theme';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const textPrimary = Template.bind({});
textPrimary.args = {
  color: 'primary',
  label: 'Text primary',
};
export const textPrimaryStartIcon = Template.bind({});
textPrimaryStartIcon.args = {
  color: 'primary',
  label: 'Text primary',
  startIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const textPrimaryEndIcon = Template.bind({});
textPrimaryEndIcon.args = {
  color: 'primary',
  label: 'Text primary',
  endIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const IconPrimary = Template.bind({});
IconPrimary.args = {
  color: 'primary',
  startIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const textSecondary = Template.bind({});
textSecondary.args = {
  color: 'secondary',
  label: 'Text secondary',
};
export const textSecondaryStartIcon = Template.bind({});
textSecondaryStartIcon.args = {
  color: 'secondary',
  label: 'Text secondary',
  startIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
};
export const textSecondaryEndIcon = Template.bind({});
textSecondaryEndIcon.args = {
  color: 'secondary',
  label: 'Text secondary',
  endIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
};
export const IconSecondary = Template.bind({});
IconSecondary.args = {
  color: 'secondary',
  startIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
};
export const containedPrimary = Template.bind({});
containedPrimary.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary',
};
export const containedPrimaryStartIcon = Template.bind({});
containedPrimaryStartIcon.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary with Start Icon',
  startIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedPrimaryEndIcon = Template.bind({});
containedPrimaryEndIcon.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary with End Icon',
  endIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedPrimaryWide = Template.bind({});
containedPrimaryWide.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary wide',
  wide: true,
};
export const containedPrimaryWideCentered = Template.bind({});
containedPrimaryWideCentered.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary wide centered',
  wide: true,
  centered: true,
};
export const containedPrimaryWideHeadIcon = Template.bind({});
containedPrimaryWideHeadIcon.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary wide with head Icon',
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconChevron />
    </Icon>
  ),
};
export const containedPrimaryWideStartIconHeadIcon = Template.bind({});
containedPrimaryWideStartIconHeadIcon.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary wide with Start Icon & Head Icon',
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconChevron />
    </Icon>
  ),
  startIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedPrimaryWideCenteredStartIcon = Template.bind({});
containedPrimaryWideCenteredStartIcon.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary wide with Start Icon',
  wide: true,
  centered: true,
  startIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedPrimaryWideCenteredEndIcon = Template.bind({});
containedPrimaryWideCenteredEndIcon.args = {
  color: 'primary',
  variant: 'contained',
  label: 'Contained primary wide with End Icon',
  wide: true,
  centered: true,
  endIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedSecondary = Template.bind({});
containedSecondary.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary',
};
export const containedSecondaryStartIcon = Template.bind({});
containedSecondaryStartIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary',
  startIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedSecondaryEndIcon = Template.bind({});
containedSecondaryEndIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary',
  endIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedSecondaryWide = Template.bind({});
containedSecondaryWide.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary wide',
  wide: true,
};
export const containedSecondaryWideCentered = Template.bind({});
containedSecondaryWideCentered.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary wide',
  wide: true,
  centered: true,
};
export const containedSecondaryWideHeadIcon = Template.bind({});
containedSecondaryWideHeadIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary wide with head Icon',
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconChevron />
    </Icon>
  ),
};
export const containedSecondaryWideStartIconHeadIcon = Template.bind({});
containedSecondaryWideStartIconHeadIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary wide with Start Icon & head Icon',
  wide: true,
  startIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
  headIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconChevron />
    </Icon>
  ),
};
export const containedSecondaryWideCenteredStartIcon = Template.bind({});
containedSecondaryWideCenteredStartIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary wide',
  centered: true,
  wide: true,
  startIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedSecondaryWideCenteredEndIcon = Template.bind({});
containedSecondaryWideCenteredEndIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained secondary wide',
  centered: true,
  wide: true,
  endIcon: (
    <Icon fillColor={lightTheme.textWhite}>
      <IconProfile />
    </Icon>
  ),
};
export const containedDisabled = Template.bind({});
containedDisabled.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained disabled',
  disabled: true,
};
export const containedDisabledStartIcon = Template.bind({});
containedDisabledStartIcon.args = {
  color: 'secondary',
  variant: 'contained',
  disabled: true,
  label: 'Contained disabled',
  startIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
export const containedDisabledEndIcon = Template.bind({});
containedDisabledEndIcon.args = {
  color: 'secondary',
  variant: 'contained',
  disabled: true,
  label: 'Contained disabled',
  endIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
export const containedDisabledWide = Template.bind({});
containedDisabledWide.args = {
  color: 'secondary',
  variant: 'contained',
  disabled: true,
  label: 'Contained disabled wide',
  wide: true,
};
export const containedDisabledWideCentered = Template.bind({});
containedDisabledWideCentered.args = {
  color: 'secondary',
  variant: 'contained',
  disabled: true,
  label: 'Contained disabled wide',
  wide: true,
  centered: true,
};
export const containedDisabledWideHeadIcon = Template.bind({});
containedDisabledWideHeadIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained disabled wide with head Icon',
  disabled: true,
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconChevron />
    </Icon>
  ),
};
export const containedDisabledWideStartIconHeadIcon = Template.bind({});
containedDisabledWideStartIconHeadIcon.args = {
  color: 'secondary',
  variant: 'contained',
  disabled: true,
  label: 'Contained disabled wide with Start Icon & head Icon',
  wide: true,
  startIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
  headIcon: (
    <Icon fillColor={lightTheme.textExtraDark}>
      <IconChevron />
    </Icon>
  ),
};
export const containedDisabledWideCenteredStartIcon = Template.bind({});
containedDisabledWideCenteredStartIcon.args = {
  color: 'secondary',
  variant: 'contained',
  disabled: true,
  label: 'Contained disabled wide',
  wide: true,
  centered: true,
  startIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
export const containedDisabledWideCenteredEndIcon = Template.bind({});
containedDisabledWideCenteredEndIcon.args = {
  color: 'secondary',
  variant: 'contained',
  label: 'Contained disabled wide',
  disabled: true,
  wide: true,
  centered: true,
  endIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
export const OutlinePrimary = Template.bind({});
OutlinePrimary.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary',
};
export const OutlinePrimaryStartIcon = Template.bind({});
OutlinePrimaryStartIcon.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary',
  startIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const OutlinePrimaryEndIcon = Template.bind({});
OutlinePrimaryEndIcon.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary',
  endIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const OutlinePrimaryWide = Template.bind({});
OutlinePrimaryWide.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary wide',
  wide: true,
};
export const OutlinePrimaryWideCentered = Template.bind({});
OutlinePrimaryWideCentered.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary wide',
  wide: true,
  centered: true,
};
export const OutlinePrimaryWideHeadIcon = Template.bind({});
OutlinePrimaryWideHeadIcon.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary wide',
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconChevron />
    </Icon>
  ),
};
export const OutlinePrimaryWideStartIconHeadIcon = Template.bind({});
OutlinePrimaryWideStartIconHeadIcon.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary wide',
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconChevron />
    </Icon>
  ),
  startIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const OutlinePrimaryWideCenteredStartIcon = Template.bind({});
OutlinePrimaryWideCenteredStartIcon.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary wide',
  wide: true,
  startIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const OutlinePrimaryWideCenteredEndIcon = Template.bind({});
OutlinePrimaryWideCenteredEndIcon.args = {
  color: 'primary',
  variant: 'outlined',
  label: 'Outline primary wide',
  wide: true,
  endIcon: (
    <Icon fillColor={lightTheme.primary}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineSecondary = Template.bind({});
outlineSecondary.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary',
};
export const outlineSecondaryStartIcon = Template.bind({});
outlineSecondaryStartIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary',
  startIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineSecondaryEndIcon = Template.bind({});
outlineSecondaryEndIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary',
  endIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineSecondaryWide = Template.bind({});
outlineSecondaryWide.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary wide',
  wide: true,
};
export const outlineSecondaryWideCentered = Template.bind({});
outlineSecondaryWideCentered.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary wide',
  wide: true,
  centered: true,
};
export const outlineSecondaryWideHeadIcon = Template.bind({});
outlineSecondaryWideHeadIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary wide',
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconChevron />
    </Icon>
  ),
};
export const outlineSecondaryWideStartIconHeadIcon = Template.bind({});
outlineSecondaryWideStartIconHeadIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary wide',
  wide: true,
  startIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
  headIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconChevron />
    </Icon>
  ),
};
export const outlineSecondaryWideCenteredStartIcon = Template.bind({});
outlineSecondaryWideCenteredStartIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary wide',
  wide: true,
  startIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineSecondaryWideCenteredEndIcon = Template.bind({});
outlineSecondaryWideCenteredEndIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline secondary wide',
  wide: true,
  endIcon: (
    <Icon fillColor={lightTheme.secondary}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineDisabled = Template.bind({});
outlineDisabled.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline disabled',
  disabled: true,
};
export const outlineDisabledStartIcon = Template.bind({});
outlineDisabledStartIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline disabled',
  disabled: true,
  startIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineDisabledEndIcon = Template.bind({});
outlineDisabledEndIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline disabled',
  disabled: true,
  endIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineDisabledWide = Template.bind({});
outlineDisabledWide.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline disabled wide',
  disabled: true,
  wide: true,
};
export const outlineDisabledWideCentered = Template.bind({});
outlineDisabledWideCentered.args = {
  color: 'secondary',
  variant: 'outlined',
  label: 'Outline disabled wide',
  disabled: true,
  wide: true,
  centered: true,
};
export const outlineDisabledWideHeadIcon = Template.bind({});
outlineDisabledWideHeadIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  disabled: true,
  label: 'Outline disabled wide',
  wide: true,
  headIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconChevron />
    </Icon>
  ),
};
export const outlineDisabledWideStartIconHeadIcon = Template.bind({});
outlineDisabledWideStartIconHeadIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  disabled: true,
  label: 'Outline disabled wide',
  wide: true,
  startIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
  headIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconChevron />
    </Icon>
  ),
};
export const outlineDisabledWideCenteredStartIcon = Template.bind({});
outlineDisabledWideCenteredStartIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  disabled: true,
  label: 'Outline disabled wide',
  wide: true,
  centered: true,
  startIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
export const outlineDisabledWideCenteredEndIcon = Template.bind({});
outlineDisabledWideCenteredEndIcon.args = {
  color: 'secondary',
  variant: 'outlined',
  disabled: true,
  label: 'Outline disabled wide',
  wide: true,
  centered: true,
  endIcon: (
    <Icon fillColor={lightTheme.textDark}>
      <IconProfile />
    </Icon>
  ),
};
