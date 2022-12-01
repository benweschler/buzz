import {
  StyledEventCapacity,
  StyledEventCapacityDiv,
  StyledEventContainer,
  StyledEventDate,
  StyledEventDateDiv,
  StyledEventDateIcon,
  StyledEventDescription,
  StyledEventImageDiv,
  StyledEventInfoLeftColumn,
  StyledEventInfoRightColumn,
  StyledEventLeftColumn,
  StyledEventLocation,
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
import { StyledEventImage } from "./styles/EventPage.styled";
import { StyledEventHeader } from "./styles/EventPage.styled";
import { StyledEventMainInfo } from "./styles/EventPage.styled";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import { useLocation } from "react-router-dom";

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
      tags,
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
      const org=organizationId
      const data=await axios.get("http://localhost:4000/api/utilities/org/"+user+"/"+org)
      if(data.data.member){
        setMember(true)
      }
      else{
        setMember(false)
      }
      console.log(data.data.member)
    }
    
    const getRSVP = async () => {
      // user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      const user =  "gygBGe9hAjfKtcguPC6LgIb3bLl2"
      const event = eventId;
      const data = await axios.get(
        "http://localhost:4000/api/utilities/" + user + "/" + event
      );
      if (data.data.registered) {
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
    console.log(rsvp.data.registered);
    if (rsvp.data.registered) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const getTime = (date) => {
    const time = new Date(date);
    let result = "";
    const day = time.getDay();
    switch (day) {
      case 0:
        result += "Sun, ";
        break;
      case 1:
        result += "Mon, ";
        break;
      case 2:
        result += "Tue, ";
        break;
      case 3:
        result += "Wed, ";
        break;
      case 4:
        result += "Thu, ";
        break;
      case 5:
        result += "Fri, ";
        break;
      case 6:
        result += "Sat, ";
        break;
      default:
        return;
    }
    const month = time.getMonth();
    switch (month) {
      case 0:
        result += "Jan ";
        break;
      case 1:
        result += "Feb ";
        break;
      case 2:
        result += "Mar ";
        break;
      case 3:
        result += "Apr ";
        break;
      case 4:
        result += "May ";
        break;
      case 5:
        result += "Jun ";
        break;
      case 6:
        result += "Jul ";
        break;
      case 7:
        result += "Aug ";
        break;
      case 8:
        result += "Sep ";
        break;
      case 9:
        result += "Oct ";
        break;
      case 10:
        result += "Nov ";
        break;
      case 11:
        result += "Dec ";
        break;
      default:
        return;
    }
    const dayOfMonth = time.getDate();
    result += dayOfMonth + ", ";

    const Hours = time.getHours();
    let Mins = time.getMinutes();
    if (Mins < 10) {
      Mins = "0" + Mins;
    }
    result += Hours + ":" + Mins;
    return result;
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
