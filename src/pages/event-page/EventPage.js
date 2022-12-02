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
import formatUnixTime from "../../utils/dateUtils";
import { useLocation } from "react-router-dom";


const EventPage = () => {
  const location = useLocation();
  const { eventID } = location.state;

  const [active, setActive] = useState(false);
  const [member, setMember] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    console.log("useEffect query in EventPage");
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

              <DateEvent>{formatUnixTime(event.date)}</DateEvent>
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
