import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from '../components/Table/Table';
import { personDetails, repaymentDetails } from '../assets/data/tableData';
import { ReactComponent as IconPencil } from './../assets/icons/icon-pencil.svg';
import GlobalStyles from '../globalStyles';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import { lightTheme } from '../theme';

export default {
  title: 'UI/Table',
  component: Table,
  argTypes: {},
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => (
  <>
    <GlobalStyles />
    <Table {...args} />
  </>
);
export const Basic = Template.bind({});
Basic.args = {
  tableData: personDetails,
};
export const CustomTableWidth = Template.bind({});
CustomTableWidth.args = {
  tableData: personDetails,
  width: '50%',
};
export const CustomTableColumnWidth = Template.bind({});
CustomTableColumnWidth.args = {
  tableData: repaymentDetails,
  width: '100%',
  columnWidth: ['15%', '20%', '15%', '18%', '18%', '15%'],
};
export const TableWithTypeOfData = Template.bind({});
TableWithTypeOfData.args = {
  tableData: repaymentDetails,
  typeOfData: ['date', 'amount', 'amount', 'date', 'amount', 'string'],
  width: '100%',
  columnWidth: ['15%', '20%', '15%', '18%', '18%', '15%'],
};
export const CustomHeaders = Template.bind({});
CustomHeaders.args = {
  tableData: repaymentDetails,
  typeOfData: ['date', 'amount', 'amount', 'date', 'amount', 'string'],
  width: '100%',
  columnWidth: ['15%', '20%', '15%', '20%', '20%', '15%'],
  headers: ['Repayment Date', 'Repayment Amount', 'Fees', 'Direct Debit Date', 'Direct Debit Amount', 'Status'],
};
export const TableCellAlignment = Template.bind({});
TableCellAlignment.args = {
  tableData: personDetails,
  alignment: 'right',
};
export const Sort = Template.bind({});
Sort.args = {
  tableData: personDetails,
  sort: true,
};
export const Labels = Template.bind({});
Labels.args = {
  tableData: [
    {
      label: 'First Name',
      text: 'Ferrara',
      icon: '',
    },
    {
      label: 'Last Name',
      text: 'Clifford',
      icon: '',
    },
    {
      label: 'City',
      text: 'Caberra',
      icon: '',
    },
  ],
  labels: true,
};
export const LabelsCustomTableWidth = Template.bind({});
LabelsCustomTableWidth.args = {
  tableData: [
    {
      label: 'First Name',
      text: 'Ferrara',
      icon: '',
    },
    {
      label: 'Last Name',
      text: 'Clifford',
      icon: '',
    },
    {
      label: 'City',
      text: 'Caberra',
      icon: '',
    },
  ],
  labels: true,
  width: '50%',
};
export const LabelsCustomTableColumnWidth = Template.bind({});
LabelsCustomTableColumnWidth.args = {
  tableData: [
    {
      label: 'First Name',
      text: 'Ferrara',
    },
    {
      label: 'Last Name',
      text: 'Clifford',
    },
    {
      label: 'City',
      text: 'Caberra',
    },
  ],
  labels: true,
  columnWidth: ['10%', '40%'],
  width: '50%',
};
export const TableCellWithIcon = Template.bind({});
TableCellWithIcon.args = {
  tableData: [
    {
      label: 'First Name',
      text: 'Ferrara',
      icon: '',
    },
    {
      label: 'Last Name',
      text: 'Clifford',
      icon: (
        <Button
          color="primary"
          startIcon={
            <Icon strokeColor={lightTheme.primary}>
              <IconPencil />
            </Icon>
          }
          onClick={() => alert('edit last name')}
        />
      ),
    },
    {
      label: 'City',
      text: 'Canberra',
      icon: (
        <Button
          color="primary"
          startIcon={
            <Icon strokeColor={lightTheme.primary}>
              <IconPencil />
            </Icon>
          }
          onClick={() => alert('edit city')}
        />
      ),
    },
  ],
  labels: true,
  columnWidth: ['15%', '20%', '5%'],
  width: '40%',
};
export const CustomTableBackground = Template.bind({});
CustomTableBackground.args = {
  tableData: [
    {
      label: 'First Name',
      text: 'Ferrara',
      icon: '',
    },
    {
      label: 'Last Name',
      text: 'Clifford',
      icon: '',
    },
    {
      label: 'City',
      text: 'Caberra',
      icon: '',
    },
  ],
  labels: true,
  background: lightTheme.bgWhite,
};
