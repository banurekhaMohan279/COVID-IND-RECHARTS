import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  Line,
  ResponsiveContainer
} from "recharts";
//import { timeFormat } from "d3";

export default function LineChartComponent(props) {
  const { series, existing, predicted } = props;

  let results = existing.map(itm => ({
    ...predicted.find(
      item => item.index === itm.index && item.prediction && itm[series]
    ),
    ...itm
  }));

  return (
    <ResponsiveContainer>
      <div className="line-chart-wrapper">
        <h5> Actual vs Prediction Plot - {series}</h5>
        <LineChart
          width={400}
          height={400}
          data={results}
          margin={{ top: 10, bottom: 10, left: 10, right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" />
          <YAxis />
          <Brush />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="prediction"
            stroke="#178FF5"
            activeDot={{ fill: "#132908", stroke: "none", r: 6 }}
          />
          <Line
            type="monotone"
            dataKey={series}
            stroke="#1EB589"
            activeDot={{ fill: "#387908", stroke: "none", r: 6 }}
          />
        </LineChart>
      </div>
    </ResponsiveContainer>
  );
}
