import styled from "styled-components";

export const CheckBoxInput = styled.input`
  float: right;
  padding: 0.5rem;
  margin: 0.5rem 2rem;
  &:checked:after {
    color: #20222f;
  }
  &:after {
    color: #f7f9ff;
  }
`;
