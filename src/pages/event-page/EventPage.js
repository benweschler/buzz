import {
  StyledEventContainer,
  StyledEventDate,
  StyledEventLeftColumn,
  StyledEventLocation,
  StyledEventOrganizer,
  StyledEventRightColumn,
  StyledRsvpAbout,
  StyledRsvpButton,
  StyledRsvpDiv,
  StyledSecurityMessage,
} from "./styles/EventPage.styled";
import DJClub from "../../assets/images/dj-club.jpg";
import { StyledEventImage } from "./styles/EventPage.styled";
import { StyledEventDescription } from "./styles/EventPage.styled";
import { StyledEventHeader } from "./styles/EventPage.styled";
import { StyledEventMainInfo } from "./styles/EventPage.styled";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
const EventPage = () => {
  return (
    <StyledEventContainer>
      <StyledEventLeftColumn>
        <StyledEventImage src={DJClub} />
        <StyledSecurityMessage>
          Buzz takes your privacy and security seriously. <br />
          Your tickets are secured by advanced encryption and stored in a
          personal QR code.
        </StyledSecurityMessage>
      </StyledEventLeftColumn>

      <StyledEventRightColumn>
        <StyledEventMainInfo>
          <StyledEventHeader>Russian Techno Night</StyledEventHeader>
          <StyledEventOrganizer> Moscow Techno</StyledEventOrganizer>
          <StyledEventLocation>
            <IoLocationOutline />
            <h3> Royce Hall </h3>
          </StyledEventLocation>

          <StyledEventDate>
            <IoCalendarClearOutline />
            Thu, 4 Nov, 9:30pm
          </StyledEventDate>
          <StyledRsvpDiv>
            <StyledRsvpAbout>
            <h4> Pricing: Free</h4>
            <p>No upfront costs, or cheeky data mining 👀</p>  
            </StyledRsvpAbout>
               
            <StyledRsvpButton>RSVP</StyledRsvpButton>
          </StyledRsvpDiv>
        </StyledEventMainInfo>
        <StyledEventDescription>
          <h2> About </h2>
          <p>Example event description.</p>
        </StyledEventDescription>
      </StyledEventRightColumn>
    </StyledEventContainer>
  );
};

export default EventPage;
