import { useEffect, useState } from "react";
import usePersistedState from "../utils/usePersistedState";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
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
  const [doses, setDoses] = useState({});
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
        modifyData(results[0]);
      });
  }, [currentSeries]);

  /*Using reduce ion one common area*/
  function modifyData(data) {
    let result = data.reduce(
      (acc, item) => {
        acc.doses[0].value = (acc.doses[0].value || 0) + Number(item.Male);
        acc.doses[1].value = (acc.doses[1].value || 0) + Number(item.Female);
        acc.doses[2].value =
          (acc.doses[2].value || 0) + Number(item.Transgender);
        acc.doseTypes[0].value =
          (acc.doses[0].value || 0) + Number(item.Covaxin);
        acc.doseTypes[1].value =
          (acc.doses[1].value || 0) + Number(item.CovidShield);
        acc.doseTypes[2].value =
          (acc.doses[2].value || 0) + Number(item.Sputnik);
        acc.doseStages[0].value =
          (acc.doses[0].value || 0) + Number(item.Dose1);
        acc.doseStages[1].value =
          (acc.doses[1].value || 0) + Number(item.Dose2);
        return acc;
      },
      {
        doses: [
          { index: "Male", value: 0 },
          { index: "Female", value: 0 },
          { index: "Transgender", value: 0 }
        ],
        doseTypes: [
          { index: "Covaxin", value: 0 },
          { index: "CovidShield", value: 0 },
          { index: "Sputnik", value: 0 }
        ],
        doseStages: [
          { index: "Dose 1", value: 0 },
          { index: "Dose 2", value: 0 }
        ]
      }
    );
    setDoses(result);
  }

  function LoadData() {
    return (
      <>
        <Row>
          <Col>
            {" "}
            <LineChartComponent data={data} series={currentSeries} />{" "}
          </Col>
          <Col>
            <BarChartComponent data={doses.doses} />
          </Col>
        </Row>
        <Row>
          <Col>
            <OneDTable
              heading="Vaccines Administered"
              header={["Name", "Total doses"]}
              data={doses.doseTypes}
            />
          </Col>
          <Col>
            <OneDTable
              heading="Total number of doses Administered"
              header={["Stage", "Total doses"]}
              data={doses.doseStages}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Carousel>
            <Carousel.Item>
              <LineChartComponent data={data} series={currentSeries} />{" "}
            </Carousel.Item>
            <Carousel.Item>
              <BarChartComponent data={doses.doses} />
            </Carousel.Item>
          </Carousel>
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
