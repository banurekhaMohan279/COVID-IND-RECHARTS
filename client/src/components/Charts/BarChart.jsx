import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
  ResponsiveContainer
} from "recharts";

export default function BarChartComponent(props) {
  const data = props.data;
  return (
    <>
      <ResponsiveContainer>
        <div className="area-chart-wrapper">
          <h5> Gender Vaccination ratio </h5>
          <BarChart
            width={400}
            height={400}
            data={data}
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
