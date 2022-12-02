import {StyledFollowingButton} from "./styles/FollowingButton.styled";

export default function FollowingButton({onSelect, isActive}) {
  return(
    <>
      <StyledFollowingButton onClick={() => onSelect()} selected={isActive}>
        <h2>Following</h2>
      </StyledFollowingButton>
    </>
  )
}