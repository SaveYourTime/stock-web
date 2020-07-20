import { Table, IconButton, Icon } from 'rsuite';

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
  <Table.Cell {...props}>
    <span>{props.rowIndex + 1}</span>
    <IconButton
      size="xs"
      appearance="subtle"
      onClick={() => onChange(rowData)}
      icon={
        <Icon
          icon={
            expandedRowKeys.some((key) => key === rowData['id'])
              ? 'minus-square-o'
              : 'plus-square-o'
          }
        />
      }
    />
  </Table.Cell>
);

export default ExpandCell;
