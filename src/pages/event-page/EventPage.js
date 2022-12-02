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
  StyledEventMainInfo,
  StyledEventHeader,
  StyledEventImage,
} from "./styles/EventPage.styled";
import {
  IoCalendarClearOutline,
  IoLocationOutline,
  IoPersonOutline,
} from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";
import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import { useLocation } from "react-router-dom";
import { getTime } from "../../utils/dateUtils";


const EventPage = () => {
  const location = useLocation();
  // const {eventID} = location.state
  const eventID = "eIUuIrsmQBg5SAbHhHQo"
  // const { state: { eventID } = {} } = useLocation();

  const [active, setActive] = useState(false);
  const [member, setMember] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    console.log("useEffect query in EventPage")
    const getInfo = async () => {
      const eventData = await axios.get(
        "http://localhost:4000/api/events/" + eventID
      );
      setEvent(eventData.data);
      const user = JSON.parse(localStorage.getItem("user")).id;
      const memberData = await axios.get(
        "http://localhost:4000/api/utilities/org/" +
          user +
          "/" +
          eventData.data.organization
      );
      if (memberData.data.member) {
        setMember(true);
      } else {
        setMember(false);
      }
      console.log(memberData.data.member);
      const registeredData = await axios.get(
        "http://localhost:4000/api/utilities/" + user + "/" + eventID
      );
      if (registeredData.data.registered) {
        setActive(true);
      } else {
        setActive(false);
      }
      
    };

    getInfo().catch(console.error);
  }, []);

  const handleRsvp = async () => {
    const body = {
      // user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      user: localStorage.getItem("user").id,
      event: eventID,
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
                {event.attending} / {event.capacity}{" "}
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
