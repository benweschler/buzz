import { Container } from "../../components/global/styles/Container.styled";
import {
  StyledEventDate,
  StyledEventLeftColumn,
  StyledEventRightColumn,
  StyledSecurityMessage,
} from "./styles/EventPage.styled";
import DJClub from "../../assets/images/dj-club.jpg";
import { StyledEventImage } from "./styles/EventPage.styled";
import { StyledEventDescription } from "./styles/EventPage.styled";
import { StyledEventHeader } from "./styles/EventPage.styled";
import { StyledEventMainInfo } from "./styles/EventPage.styled";
const EventPage = () => {
  return (
    <>
      <Container>
        <StyledEventLeftColumn>
          <StyledEventImage src={DJClub} />
          <StyledSecurityMessage>
            Buzz holds your privacy and security dearly. <br />
            Your tickets are secured by advanced encryption <br />
            and stored in a personal QR code.
          </StyledSecurityMessage>
        </StyledEventLeftColumn>

        <StyledEventRightColumn>
          <StyledEventMainInfo>
            <StyledEventHeader>Russian Techno Night</StyledEventHeader>
            <h3> Royce Hall </h3>
            <StyledEventDate> Thu, 4 Nov, 9:30pm</StyledEventDate>
          </StyledEventMainInfo>
        </StyledEventRightColumn>
      </Container>
    </>
  );
};

export default EventPage;
