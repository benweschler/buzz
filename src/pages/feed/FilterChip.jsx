import styled from "styled-components";
import Color from "color";

export default function FilterChip(props) {
  return (
    <FilterChipStyle selected={props.selected} onClick={props.onClick}>
      <div className="icon">{props.icon}</div> {props.name}
    </FilterChipStyle>
  )
}

const FilterChipStyle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 0.5rem;
  align-self: start;
  padding: 0.5rem;
  width: 4rem;
  height: 4rem;
  font-size: 0.75rem;

  border: ${props => props.selected ?
          `${Color(props.theme.main).alpha(0.5)} 1px solid`
          : "black 1px solid"};
  background: ${props => props.selected
          ? Color(props.theme.main).alpha(0.5)
          : "white"};

  &:hover {
    cursor: pointer;
    background: ${props => props.selected
            ? null
            : "#f3f3f3"};
  }

  .icon {
    font-size: 1.25rem;
  }
`;
