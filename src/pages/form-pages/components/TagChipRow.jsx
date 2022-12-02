import styled from 'styled-components';
import Constants from "../../../constants/Constants";
import Color from "color";

const TagChip = styled.button`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  
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
`

function TagChipRow(props) {
  const tagChips = [];
  for(const [tag, icon] of Object.entries(Constants.tags)) {
    tagChips.push(
      <TagChip
        type='button'
        key={tag}
        onClick={() => props.toggleTag(tag)}
        selected={props.selectedTags.includes(tag)}
      >
        {icon} {tag}
      </TagChip>
    )
  }

  return tagChips;
}

export default TagChipRow;