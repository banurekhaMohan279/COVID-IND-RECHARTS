import { Form } from "react-bootstrap";
import useDataApi from "../utils/useDataApi";

const Select = props => {
  const { series, setSeries } = props;
  const [data, isError] = useDataApi("http://localhost:3002/series", []);

  const handleChange = e => {
    e.preventDefault();
    setSeries(e.currentTarget.value);
  };

  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      <Form>
        <Form.Group>
          <Form.Label>Select Series</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            onChange={handleChange}
            defaultValue={series}
          >
            {data.map(element => (
              <option key={element.toString()}>{element}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  );
};

export default Select;
