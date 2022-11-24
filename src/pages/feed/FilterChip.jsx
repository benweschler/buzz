import styled from "styled-components";
import Color from "color";

export default function FilterChip(props) {
  return (
    <FilterChipStyle>
      {props.icon} {props.name}
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
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.75rem;

  border: ${props => props.selected ?
          `${props.theme.main} 1px solid`
          : "black 1px solid"};
  background: ${props => props.selected
          ? Color(props.theme.main).alpha(0.5)
          : "white"};

  .icon {
    font-size: 1.25rem;
  }
`;
