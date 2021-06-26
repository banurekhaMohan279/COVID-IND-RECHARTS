import Table from "react-bootstrap/Table";

export default function TwoDTable(props) {
  const { heading, data } = props;

  function displayBody() {
    let res = [];
    // restruturing confusionmetric object to a 2D array
    if (data) {
      res.push(
        [" ", "Positive", "Negative"],
        ["Positive", data["truePositive"], data["trueNegative"]],
        ["Negative", data["falsePositive"], data["falseNegative"]]
      );
      let rows = res.map((item, i) => {
        let entry = item.map((element, j) => {
          return <td key={j}>{element}</td>;
        });
        return <tr key={i}>{entry}</tr>;
      });
      return rows;
    }
  }

  return (
    <>
      <h5> {heading} </h5>
      <Table striped bordered hover variant="dark">
        <tbody>{displayBody()}</tbody>
      </Table>
    </>
  );
}
