import { useEffect, useState } from "react";
import usePersistedState from "../utils/usePersistedState";
import useDataApi from "../utils/useDataApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "../components/Select.jsx";
import BarChartComponent from "../components/Charts/BarChart";
import LineChartComponent from "../components/Charts/LineChart";
import OneDTable from "../components/1DTable";
//import Carousel from "react-bootstrap/Carousel";
//import TwoDTable from "../components/2DTable";

function Dashboard() {
  const [currentSeries, setCurrentSeries] = usePersistedState(
    "currentSeries",
    "India"
  );
  const [data, isLoading] = useDataApi(
    `http://localhost:3002/data/${currentSeries}`,
    [],
    currentSeries
  );
  const [doses, setDoses] = useState({});
  useEffect(() => {
    //modify data after data is changed by useDataApi
    modifyData(data);
  }, [data]);

  /*Using reduce in one common area*/
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
            <LineChartComponent data={data} series={currentSeries} />
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
        <Row>
          <p className="disclaimer">
            {data.length > 0
              ? `* The following data is for dates ${data[0].date} to ${data[99].date}`
              : ""}
          </p>
        </Row>
        {/*
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
        */}
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
