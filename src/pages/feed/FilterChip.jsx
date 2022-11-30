import {FilterChipStyle, Icon} from "./styles/FilterChip.styled";

export default function FilterChip(props) {
  return (
    <FilterChipStyle selected={props.selected} onClick={props.onClick}>
      <Icon>{props.icon}</Icon>
      {props.name}
    </FilterChipStyle>
  )
}
