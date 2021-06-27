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
  let result = [];
  if (data) {
    result = data.reduce(
      (acc, item) => {
        acc[0].value = (acc[0].value || 0) + Number(item.Male);
        acc[1].value = (acc[1].value || 0) + Number(item.Female);
        acc[2].value = (acc[2].value || 0) + Number(item.Transgender);
        return acc;
      },
      [
        { index: "Male", value: 0 },
        { index: "Female", value: 0 },
        { index: "Transgender", value: 0 }
      ]
    );
  }

  return (
    <>
      <ResponsiveContainer>
        <div className="area-chart-wrapper">
          <h5> Gender Vaccination ratio </h5>
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
