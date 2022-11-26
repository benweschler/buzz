import { StyledUserProfile, StyledLeftColumn, StyledRightColumn, StyledUserAvatar, StyledUserInfo } from "../styles/UserProfile.styled"
// import ExampleEvents from "../../assets/ExampleEvents.json"
// import UserEventCard from "../../components/UserPage/UserEventCard"
import { Container } from "../../components/styles/Container.styled"

const UserMain = () => {
  return (
    <Container>
        <StyledUserProfile>
          <StyledUserAvatar src="https://avatars.dicebear.com/api/initials/Julius Dunfoy.svg" />
          <StyledUserInfo>
            <h2>Julius Dunfoy</h2>
            <p> Email: juliusdunfoy@ucla.edu <br/>
              Major: Linguistics & Computer Science</p>
          </StyledUserInfo>
        </StyledUserProfile>
        <StyledLeftColumn>
          <h2>Your Tickets</h2>
        </StyledLeftColumn>
        <StyledRightColumn>
          <h2>Your Organizations</h2>
        </StyledRightColumn>
      {/* {ExampleEvents.map((item, index) => (
        <UserEventCard key={index} item={item } />
      ))} */}
    </Container>
    
  )
}

export default UserMain