import styled from "styled-components";
import Color from "color";

export default function FilterChip(props) {
  return (
    <FilterChipStyle selected={props.selected} onClick={props.onClick}>
      <div className="icon">{props.icon}</div>
      {props.name}
    </FilterChipStyle>
  )
}

const FilterChipStyle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5rem;
  align-self: start;
  padding: 0.5rem;
  width: 4rem;
  height: 4rem;
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
    filter: brightness(${props => props.theme.brightness === "light" ? 92.5 : 150}%);
  }

  .icon {
    font-size: 1.25rem;
  }
`;
