import { useState } from 'react';

import {
  ScrollContainer,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from './styles';
import { ITableData, ITableProps } from './types';
import { ReactComponent as IconSort } from 'assets/icons/icon-sort.svg';

let sortValue: string;
const triggerValues: string[] = [];
let date: boolean;
let sortedData: ITableData[];

const Table = ({
  tableData,
  typeOfData,
  width = '100%',
  columnWidth,
  headers,
  labels,
  alignment,
  sort,
  background,
}: ITableProps) => {
  const [sortData, setSortData] = useState({
    asc: false,
    desc: false,
  });

  if (sort) {
    sortedData = [...tableData];
    sortedData.sort(function (a, b) {
      const valA = a[sortValue];
      const valB = b[sortValue];
      const index = Object.keys(tableData[0]).findIndex((key) => tableData[0][key] === sortValue);
      if (typeOfData) {
        if (typeOfData[index] === 'date') {
          date = true;
        }
      }
      if (date) {
        if (new Date(valA) < new Date(valB)) {
          if ((!sortData.asc && !sortData.desc) || sortData.asc) {
            return -1;
          } else if (sortData.desc) {
            return 1;
          }
        }
        if (new Date(valA) > new Date(valB)) {
          if ((!sortData.asc && !sortData.desc) || sortData.asc) {
            return 1;
          } else if (sortData.desc) {
            return -1;
          }
        }
        return 0;
      } else {
        if (valA < valB) {
          if ((!sortData.asc && !sortData.desc) || sortData.asc) {
            return -1;
          } else if (sortData.desc) {
            return 1;
          }
        }
        if (valA > valB) {
          if ((!sortData.asc && !sortData.desc) || sortData.asc) {
            return 1;
          } else if (sortData.desc) {
            return -1;
          }
        }
        return 0;
      }
    });
  }

  const handleSort = (sortOnValue: string) => {
    if (headers) {
      sortValue = Object.keys(tableData[0])[headers.indexOf(sortOnValue)];
    } else {
      sortValue = sortOnValue;
    }
    triggerValues.push(sortValue);

    if (sortValue && !triggerValues[triggerValues.length - 2]) {
      setSortData({ ...sortData, asc: !sortData.asc });
    } else if (sortValue && triggerValues[triggerValues.length - 1] === triggerValues[triggerValues.length - 2]) {
      setSortData({ ...sortData, asc: !sortData.asc, desc: !sortData.desc });
    } else if (sortValue && triggerValues[triggerValues.length - 1] !== triggerValues[triggerValues.length - 2]) {
      setSortData({ ...sortData, asc: true, desc: false });
    }
  };

  return (
    <ScrollContainer>
      <TableContainer width={width} alignment={alignment}>
        {!labels && (
          <TableHeader>
            <TableRow>
              {(headers ? headers : Object.keys(tableData[0])).map((item, index) => {
                return (
                  <TableHeaderCell
                    key={index}
                    width={columnWidth && columnWidth[index]}
                    sortType={sortData.asc ? 'asc' : sortData.desc ? 'desc' : ''}
                    onClick={() => handleSort(item)}
                  >
                    <div>
                      <span>{item.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span>{sort && <IconSort />}</span>
                    </div>
                  </TableHeaderCell>
                );
              })}
            </TableRow>
          </TableHeader>
        )}
        <TableBody bgColor={background}>
          {(sort ? sortedData : tableData).map((item, index) => {
            return (
              <TableRow key={index} withLabels={labels}>
                {labels
                  ? Object.values(item).map((data, index) => {
                      return (
                        <TableCell
                          key={index}
                          labelIndicator={
                            Object.keys(item).find((key) => item[key] === data) === 'label' ? true : false
                          }
                          icon={Object.keys(item).find((key) => item[key] === data) === 'icon' ? true : false}
                          width={columnWidth && columnWidth[index]}
                        >
                          {data}
                        </TableCell>
                      );
                    })
                  : Object.values(item).map((data, index) => {
                      return (
                        <TableCell key={index}>
                          {typeOfData
                            ? typeOfData[index] === 'date'
                              ? new Date(data).getDate().toString() +
                                '/' +
                                new Date(data).getMonth().toString() +
                                '/' +
                                new Date(data).getFullYear().toString()
                              : typeOfData[index] === 'amount'
                              ? '$' + data
                              : data
                            : data}
                        </TableCell>
                      );
                    })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </ScrollContainer>
  );
};

export default Table;
