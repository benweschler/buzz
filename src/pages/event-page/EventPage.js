import { Container } from "../../components/global/styles/Container.styled";
import {
  StyledEventDate,
  StyledEventLeftColumn,
  StyledEventLocation,
  StyledEventRightColumn,
  StyledSecurityMessage,
} from "./styles/EventPage.styled";
import DJClub from "../../assets/images/dj-club.jpg";
import { StyledEventImage } from "./styles/EventPage.styled";
import { StyledEventDescription } from "./styles/EventPage.styled";
import { StyledEventHeader } from "./styles/EventPage.styled";
import { StyledEventMainInfo } from "./styles/EventPage.styled";
import { IoCalendarClearOutline } from "react-icons/io5"
import { IoLocationOutline } from "react-icons/io5"
const EventPage = () => {
  return (
    <>
      <Container>
        <StyledEventLeftColumn>
          <StyledEventImage src={DJClub} />
          <StyledSecurityMessage>
            Buzz takes your privacy and security seriously. <br />
            Your tickets are secured by advanced encryption
            and stored in a personal QR code.
          </StyledSecurityMessage>
        </StyledEventLeftColumn>

        <StyledEventRightColumn>
          <StyledEventMainInfo>
            <StyledEventHeader>Russian Techno Night</StyledEventHeader>
            <StyledEventLocation>
              <IoLocationOutline />
              <h3> Royce Hall </h3>
            </StyledEventLocation>
            
            <StyledEventDate> 
              <IoCalendarClearOutline />
              Thu, 4 Nov, 9:30pm
            </StyledEventDate>
          </StyledEventMainInfo>
          <StyledEventDescription>
            <h2> About </h2>
            <p>
              Example event description.
            </p>
          </StyledEventDescription>
        </StyledEventRightColumn>
      </Container>
    </>
  );
};

export default EventPage;
