import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
  ResponsiveContainer
} from "recharts";
//import BarChartD3 from "./pureD3/BarChart/BarChart.jsx";

export default function BarChartComponent(props) {
  const featureImportance = props.featureImportance;
  let result = [];
  if (featureImportance) {
    for (const [key, value] of Object.entries(featureImportance)) {
      if (value > 0) result.push({ index: key, value: value.toFixed(3) });
    }
  }

  return (
    <>
      <ResponsiveContainer>
        <div className="area-chart-wrapper">
          <h5> Feature Importance </h5>
          <BarChart
            width={400}
            height={400}
            data={result}
            margin={{ top: 20, right: 50, bottom: 20, left: 50 }}
            layout="vertical"
          >
            <XAxis datakey="value" type="number" />
            <YAxis dataKey="index" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#1EB589">
              <LabelList position="right" />
            </Bar>
          </BarChart>
        </div>
      </ResponsiveContainer>
    </>
  );
}
