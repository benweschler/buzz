import {
  EventContainer,
  EventDescription,
  EventRightColumn,
} from "./styles/EventPage.styled";
import {
  ImageDivEvent,
  ImageEvent,
  LeftColumnEvent,
  SecurityMessage,
} from "./styles/EventImageArea.styled";
import {
  CapacityDiv,
  CapacityEvent,
  DateEvent,
  EventDateDiv,
  EventHeader,
  InfoLeftColumn,
  InfoRightColumn,
  LocationEvent,
  MainInfo,
  OrganizerEvent,
  QRDivEvent,
  QRHeader,
} from "./styles/EventPageInfoPanel.styled";
import {
  RsvpAbout,
  RsvpButton,
  RsvpDiv,
  RsvpMessage,
} from "./styles/EventRSVP.styled";
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
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const { eventID } = location.state;

  const [active, setActive] = useState(false);
  const [member, setMember] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    console.log("useEffect query in EventPage");
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
    const userInfo=JSON.parse(localStorage.get('user'))
    const body = {
      // user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      user: userInfo.id,
      event: eventId
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
    let userData=JSON.parse(localStorage.getItem('user'))
    userData={...userData, events_registered: events}
    JSON.stringify(userData)
    localStorage.setItem(userData)
  };

  return (
    <EventContainer>
      <LeftColumnEvent>
        <ImageDivEvent>
          <ImageEvent src={event.image} />
        </ImageDivEvent>
        <SecurityMessage>
          Buzz takes your privacy and security seriously. <br />
          Your tickets are secured by advanced encryption and stored in a
          personal QR code.
        </SecurityMessage>
      </LeftColumnEvent>

      <EventRightColumn>
        <EventHeader>{event.title}</EventHeader>
        <MainInfo>
          <InfoLeftColumn>
            <OrganizerEvent> {event.organizer}</OrganizerEvent>
            <CapacityDiv>
              <IoPersonOutline />
              <CapacityEvent>
                {event.attending} / {event.capacity}{" "}
              </CapacityEvent>
            </CapacityDiv>
            <LocationEvent>
              <IoLocationOutline />
              <h3> {event.location} </h3>
            </LocationEvent>
            <EventDateDiv>
              <IoCalendarClearOutline />

              <DateEvent>{getTime(event.date)}</DateEvent>
            </EventDateDiv>
          </InfoLeftColumn>
          <InfoRightColumn>
            {member && (
              <QRDivEvent>
                <QrCodeScannerRoundedIcon />
                <QRHeader> QR Scanner </QRHeader>
              </QRDivEvent>
            )}
          </InfoRightColumn>
        </MainInfo>

        <RsvpDiv>
          <RsvpAbout>
            <h4> Price: {event.ticketed ? "$" + event.price : "Free!"}</h4>
            <RsvpMessage>
              No extra upfront costs, or cheeky data mining 👀
            </RsvpMessage>
          </RsvpAbout>
          <RsvpButton onClick={handleRsvp} activated={active}>
            {active ? "RSVPed" : "RSVP"}
          </RsvpButton>
        </RsvpDiv>

        <EventDescription>
          <h2> About </h2>
          <p>{event.description}</p>
        </EventDescription>
      </EventRightColumn>
    </EventContainer>
  );
};

export default EventPage;
