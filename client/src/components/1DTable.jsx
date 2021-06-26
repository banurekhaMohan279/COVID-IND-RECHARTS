import Table from "react-bootstrap/Table";

export default function OneDTable(props) {
  const { heading, header, data } = props;

  function displayBody() {
    if (data) {
      return Object.entries(data).map(([key, value]) => {
        return (
          <tr key={key.toString()}>
            <td> {key} </td>
            <td> {Number(value) ? value.toFixed(3) : value} </td>
          </tr>
        );
      });
    }
  }

  return (
    <>
      <h5> {heading} </h5>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {header.map(item => {
              return <th key={item.toString()}> {item} </th>;
            })}
          </tr>
        </thead>
        <tbody>{displayBody()}</tbody>
      </Table>
    </>
  );
}
