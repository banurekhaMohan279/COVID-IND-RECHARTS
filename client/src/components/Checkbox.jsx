import { CheckBoxInput } from "../assets/css/Checkbox.style.js";
import { useContext } from "react";
import { ThemeContext } from "../App";

const Checkbox = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleChange = e => setTheme(prev => !prev);
  return (
    <>
      <CheckBoxInput
        id="input"
        type="checkbox"
        onChange={handleChange}
        defaultChecked={theme}
      />
    </>
  );
};

export default Checkbox;
