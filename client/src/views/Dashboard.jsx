import { useEffect, useState } from "react";
import usePersistedState from "../utils/usePersistedState";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "../components/Select.jsx";
import BarChartComponent from "../components/Charts/BarChart";
import OneDTable from "../components/1DTable";
import TwoDTable from "../components/2DTable";
import LineChartComponent from "../components/Charts/LineChart";

function Dashboard() {
  const [currentSeries, setCurrentSeries] = usePersistedState(
    "currentSeries",
    "India"
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let urls = [
    `http://localhost:3002/data/${currentSeries}`
    //  `http://localhost:3002/results/${currentSeries}`
  ];

  useEffect(() => {
    setIsLoading(true);
    let requests = urls.map(url => fetch(url));
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(results => {
        setData(results[0]);
        setIsLoading(false);
      });
  }, [currentSeries]);

  function LoadData() {
    return (
      <>
        <Row>
          <Col>
            {" "}
            <LineChartComponent data={data} series={currentSeries} />{" "}
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Container fluid>
      <Select series={currentSeries} setSeries={setCurrentSeries} />
      {isLoading ? <div> Loading... </div> : LoadData()}
    </Container>
  );
}
export default Dashboard;
