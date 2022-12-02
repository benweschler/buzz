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
import { getTime } from "../../utils/dateUtils";

//old import code
// onClick={() => {
//   navigate("/event-page", {
//     state: {
//       title: title,
//       image: image,
//       date: date,
//       organizer: organizer,
//       location: location,
//       attendees: attendees,
//       price: price,
//       tags: tags,
//       organizationId: organizationId,
//       description: description,
//       capacity: capacity,
//       ticketed: ticketed,
//       eventId: eventId,
//     },
//   });
// }}

const EventPage = () => {
  //   const {
  //     state: {
  //       title,
  //       image,
  //       date,
  //       organizer,
  //       location,
  //       attendees,
  //       price,
  //       tags,
  //       organizationId,
  //       description,
  //       capacity,
  //       ticketed,

  const { state: { eventId } = {} } = useLocation();

  const [active, setActive] = useState(false);
  const [member, setMember] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      const eventId = "UZOKqjWI96Y6SMjxgQhb";
      const eventData = await axios.get(
        "http://localhost:4000/api/events/" + eventId
      );
      setEvent(eventData.data);
      const user = "gygBGe9hAjfKtcguPC6LgIb3bLl2";
      
      const memberData = await axios.get(
        "http://localhost:4000/api/utilities/org/" + user + "/" + event.organizationId
      );
      if (memberData.data.member) {
        setMember(true);
      } else {
        setMember(false);
      }

      console.log(memberData.data.member)
    }
    
    const getRSVP = async () => {
      // user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      const user =  "gygBGe9hAjfKtcguPC6LgIb3bLl2"
      const event = eventId;
      const data = await axios.get(
        "http://localhost:4000/api/utilities/" + user + "/" + event.eventId
      );
      if (data.data.registered) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    getRSVP().catch(console.error);
    getInfo().catch(console.error);
  }, );



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

  return (
    <StyledEventContainer>
      <StyledEventLeftColumn>
        <StyledEventImageDiv>
          <StyledEventImage src={event.image} />
        </StyledEventImageDiv>
        <StyledSecurityMessage>
          Buzz takes your privacy and security seriously. <br />
          Your tickets are secured by advanced encryption and stored in a
          personal QR code.
        </StyledSecurityMessage>
      </StyledEventLeftColumn>

      <StyledEventRightColumn>
        <StyledEventHeader>{event.title}</StyledEventHeader>
        <StyledEventMainInfo>
          <StyledEventInfoLeftColumn>
            <StyledEventOrganizer> {event.organizer}</StyledEventOrganizer>
            <StyledEventCapacityDiv>
              <IoPersonOutline />
              <StyledEventCapacity>
                {event.attendees} / {event.capacity}{" "}
              </StyledEventCapacity>
            </StyledEventCapacityDiv>
            <StyledEventLocation>
              <IoLocationOutline />
              <h3> {event.location} </h3>
            </StyledEventLocation>
            <StyledEventDateDiv>
              <IoCalendarClearOutline />

              <StyledEventDate>{getTime(event.date)}</StyledEventDate>
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
            <h4> Price: {event.ticketed ? "$" + event.price : "Free!"}</h4>
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
          <p>{event.description}</p>
        </StyledEventDescription>
      </StyledEventRightColumn>
    </StyledEventContainer>
  );
};

export default EventPage;
