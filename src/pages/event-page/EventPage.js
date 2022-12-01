import {
  StyledEventContainer,
  StyledEventDate,
  StyledEventDescription,
  StyledEventImageDiv,
  StyledEventLeftColumn,
  StyledEventLocation,
  StyledEventOrganizer,
  StyledEventRightColumn,
  StyledRsvpAbout,
  StyledRsvpButton,
  StyledRsvpDiv,
  StyledRsvpMessage,
  StyledSecurityMessage,
} from "./styles/EventPage.styled";
import DJClub from "../../assets/images/dj-club.jpg";
import { StyledEventImage } from "./styles/EventPage.styled";
import { StyledEventHeader } from "./styles/EventPage.styled";
import { StyledEventMainInfo } from "./styles/EventPage.styled";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";

const EventPage = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getRSVP = async () => {
      const user="gygBGe9hAjfKtcguPC6LgIb3bLl2"
      const event="eIUuIrsmQBg5SAbHhHQo"
      const data=await axios.get("http://localhost:4000/api/utilities/"+user+"/"+event)
      if(data.data.registered)
      {
        setActive(true)
      }
      else{
        setActive(false)
      }
    }

    getRSVP().catch(console.error);
  }, [active]);

  const handleRsvp = async () => {
    const body={
      user:"gygBGe9hAjfKtcguPC6LgIb3bLl2",
      event:"eIUuIrsmQBg5SAbHhHQo"
    }
    const rsvp=await axios.patch("http://localhost:4000/api/users/register", body)
    console.log(rsvp.data.registered)
    if(rsvp.data.registered){
      setActive(true)
    }
    else{
      setActive(false)
    }
  
    //if(rsvp.data.registered)
    //set active
    //else set

  }
  
  return (
    <StyledEventContainer>
      <StyledEventLeftColumn>
        <StyledEventImageDiv>
          <StyledEventImage src={DJClub} />
        </StyledEventImageDiv>
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
              <StyledRsvpMessage>
                No upfront costs, or cheeky data mining 👀
              </StyledRsvpMessage>
            </StyledRsvpAbout>

            <StyledRsvpButton onClick={handleRsvp} activated={active}>{active ? "RSVPed" : "RSVP"}</StyledRsvpButton>
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
