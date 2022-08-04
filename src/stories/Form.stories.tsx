import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormMain from '../components/FormMain/FormMain';
import { FormRow } from '../components/FormMain/styles';
import FormCell from '../components/FormCell/FormCell';
import FormInputText from '../components/FormInputText/FormInputText';
import GlobalStyles from '../globalStyles';

const MockedFormInputText = () => {
  const [sampleValue, setSampleValue] = useState('');

  return (
    <FormInputText
      name="lastname"
      onChange={(e) => setSampleValue(e.target.value)}
      value={sampleValue}
      label="Placeholder"
      floatingLabel
    />
  );
};

export default {
  title: 'Forms/Form',
  component: FormMain,
} as ComponentMeta<typeof FormMain>;

const Template: ComponentStory<typeof FormMain> = (args) => {
  return (
    <>
      <GlobalStyles />
      <FormMain {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: (
    <FormRow>
      <FormCell>
        <MockedFormInputText />
      </FormCell>
    </FormRow>
  ),
};
export const CustomWidth = Template.bind({});
CustomWidth.args = {
  children: (
    <FormRow>
      <FormCell cellWidth="60%">
        <MockedFormInputText />
      </FormCell>
    </FormRow>
  ),
};
export const MultipleColumns = Template.bind({});
MultipleColumns.args = {
  children: (
    <FormRow>
      <FormCell cellWidth="32%">
        <MockedFormInputText />
      </FormCell>
      <FormCell cellWidth="32%">
        <MockedFormInputText />
      </FormCell>
      <FormCell cellWidth="32%">
        <MockedFormInputText />
      </FormCell>
    </FormRow>
  ),
};
export const MultipleRows = Template.bind({});
MultipleRows.args = {
  children: (
    <>
      <FormRow>
        <FormCell cellWidth="15%">
          <label htmlFor="firstname">First name*</label>
        </FormCell>
        <FormCell>
          <MockedFormInputText />
        </FormCell>
      </FormRow>
      <FormRow>
        <FormCell cellWidth="15%">
          <label htmlFor="lastname">Last name*</label>
        </FormCell>
        <FormCell>
          <MockedFormInputText />
        </FormCell>
      </FormRow>
    </>
  ),
};
