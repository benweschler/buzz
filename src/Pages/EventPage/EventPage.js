import { Container } from "../../components/styles/Container.styled"
import { StyledEventLeftColumn, StyledEventRightColumn } from "../../components/styles/EventPage.styled"
import DJClub from "../../assets/images/dj-club.jpg"
import { StyledEventImage } from "../../components/styles/EventPage.styled"
import { StyledEventDescription } from "../../components/styles/EventPage.styled"
import { StyledEventHeader } from "../../components/styles/EventPage.styled"
import { StyledEventMainInfo } from "../../components/styles/EventPage.styled"
const EventPage = () => {
  return (
    <>
      <Container>
        <StyledEventLeftColumn>
          <StyledEventImage src= {DJClub} />
        </StyledEventLeftColumn>
        
        <StyledEventRightColumn>
          <StyledEventMainInfo>
            <StyledEventHeader>Russian Techno Night</StyledEventHeader>

          </StyledEventMainInfo>

        </StyledEventRightColumn>
      </Container>
    
    </>
  )
}

export default EventPage