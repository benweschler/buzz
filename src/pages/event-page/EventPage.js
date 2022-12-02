import {
  StyledEventCapacity,
  StyledEventCapacityDiv,
  StyledEventContainer,
  StyledEventDate,
  StyledEventDateDiv,
  StyledEventDescription,
  StyledEventHeader,
  StyledEventImage,
  StyledEventImageDiv,
  StyledEventInfoLeftColumn,
  StyledEventInfoRightColumn,
  StyledEventLeftColumn,
  StyledEventLocation,
  StyledEventMainInfo,
  StyledEventOrganizer,
  StyledEventQRDiv,
  StyledEventQRHeader,
  StyledEventRightColumn,
  StyledRsvpAbout,
  StyledRsvpButton,
  StyledRsvpDiv,
  StyledRsvpMessage,
  StyledSecurityMessage,
} from "./styles/EventPage.styled";
import {
  IoCalendarClearOutline,
  IoLocationOutline,
  IoPersonOutline
} from "react-icons/io5";
import axios from "axios";
import {useEffect, useState} from "react";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import {useLocation} from "react-router-dom";
import {getTime} from "../../utils/dateUtils";

const EventPage = () => {
  const {
    state: {
      title,
      image,
      date,
      organizer,
      location,
      attendees,
      price,
      organizationId,
      description,
      capacity,
      ticketed,
      eventId,
    } = {},
  } = useLocation();

  const [active, setActive] = useState(false);
  const [member, setMember] = useState(false);




  useEffect(() => {

    const getOrgRelation = async () => {
      // user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      const user =  "gygBGe9hAjfKtcguPC6LgIb3bLl2"
      const data=await axios.get("http://localhost:4000/api/utilities/org/"+user+"/"+organizationId)
      if(data["data"].member){
        setMember(true)
      }
      else{
        setMember(false)
      }
      console.log(data["data"].member)
    }
    
    const getRSVP = async () => {
      // user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      const user =  "gygBGe9hAjfKtcguPC6LgIb3bLl2"
      const data = await axios.get(
        "http://localhost:4000/api/utilities/" + user + "/" + eventId
      );
      if (data["data"].registered) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    getRSVP().catch(console.error);
    getOrgRelation().catch(console.error);
  }, [active, eventId, organizationId]);

  const handleRsvp = async () => {
    const body = {
      // user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      event: eventId,
    };
    const rsvp = await axios.patch(
      "http://localhost:4000/api/users/register",
      body
    );
    console.log(rsvp["data"].registered);
    if (rsvp["data"].registered) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <StyledEventContainer>
      <StyledEventLeftColumn>
        <StyledEventImageDiv>
          <StyledEventImage src={image} />
        </StyledEventImageDiv>
        <StyledSecurityMessage>
          Buzz takes your privacy and security seriously. <br />
          Your tickets are secured by advanced encryption and stored in a
          personal QR code.
        </StyledSecurityMessage>
      </StyledEventLeftColumn>

      <StyledEventRightColumn>
        <StyledEventHeader>{title}</StyledEventHeader>
        <StyledEventMainInfo>
          <StyledEventInfoLeftColumn>
            <StyledEventOrganizer> {organizer}</StyledEventOrganizer>
            <StyledEventCapacityDiv>
              <IoPersonOutline />
              <StyledEventCapacity>
                {attendees} / {capacity}{" "}
              </StyledEventCapacity>
            </StyledEventCapacityDiv>
            <StyledEventLocation>
              <IoLocationOutline />
              <h3> {location} </h3>
            </StyledEventLocation>
            <StyledEventDateDiv>
              <IoCalendarClearOutline />
              
              <StyledEventDate>{getTime(date)}</StyledEventDate>
            </StyledEventDateDiv>
          </StyledEventInfoLeftColumn>
          <StyledEventInfoRightColumn>
          {member && (
            <StyledEventQRDiv>
              <QrCodeScannerRoundedIcon />
              <StyledEventQRHeader> QR Scanner </StyledEventQRHeader>
            </StyledEventQRDiv>
          )}
          </StyledEventInfoRightColumn>
        </StyledEventMainInfo>

        <StyledRsvpDiv>
          <StyledRsvpAbout>
            <h4> Price: {ticketed ? "$" + price : "Free!"}</h4>
            <StyledRsvpMessage>
              No extra upfront costs, or cheeky data mining 👀
            </StyledRsvpMessage>
          </StyledRsvpAbout>

          <StyledRsvpButton onClick={handleRsvp} activated={active}>
            {active ? "RSVPed" : "RSVP"}
          </StyledRsvpButton>
        </StyledRsvpDiv>
        <StyledEventDescription>
          <h2> About </h2>
          <p>{description}</p>
        </StyledEventDescription>
      </StyledEventRightColumn>
    </StyledEventContainer>
  );
};

export default EventPage;
