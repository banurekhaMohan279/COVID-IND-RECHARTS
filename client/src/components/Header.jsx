import Row from "react-bootstrap/Row";
import { HeaderBtn } from "../assets/css/Header.style.js";
import Checkbox from "./Checkbox.jsx";

const Header = () => {
  return (
    <Row>
      <HeaderBtn>
        COWIN IND Vaccinationation data
        <Checkbox />
      </HeaderBtn>
    </Row>
  );
};
export default Header;
