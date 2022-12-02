import styled from "styled-components";
import Color from "color";

export const FilterChipStyle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5rem;
  align-self: start;
  padding: 0.5rem;
  width: 4.5rem;
  height: 4.5rem;
  font-size: 0.75rem;
  transition: color 200ms ease-in;

  border: ${props => props.selected ?
  `${Color(props.theme.main).alpha(0.5)} 1px solid`
  : `${props.theme.brightness === "light"
    ? "black"
    : props.theme.highlightCard}
            1px solid`};
  background: ${props => props.selected
  ? Color(props.theme.main).alpha(0.5)
  : props.theme.highlightCard};
  color: ${props => props.theme.text};

  &:hover {
    cursor: pointer;
    filter: brightness(${props => props.theme.brightness === "light" ? 92.5 : 115}%);
  }
  
  .chipIcon {
    font-size: 1.75rem;
  }
`;

export const Icon = styled.div`
  font-size: 1.25rem;
`