interface TableHeaderProps {
  headers: string[];
}
const TableHeader = (props: TableHeaderProps) => {
  const { headers } = props;
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={"user-table-header" + index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
