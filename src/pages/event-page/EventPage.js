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
  EventOrgLink,
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
import { useParams } from "react-router-dom";
import { LoadingIndicator } from "../feed/styles/Feed.styled";
import { HashLoader } from "react-spinners";
import { useTheme } from "styled-components";

const EventPage = () => {
  const params = useParams();
  const eventID = params.id

  const [active, setActive] = useState(false);
  const [member, setMember] = useState(false);
  const [eventData, setEventData] = useState(null);

  const theme = useTheme()

  useEffect(() => {
    console.log("useEffect query in EventPage");
    const getInfo = async () => {
      const eventData = await axios.get(
        "http://localhost:4000/api/events/" + eventID
      );
      setEventData(eventData.data);
      console.log(eventData);
      const user = JSON.parse(localStorage.getItem("user")).id;
      const memberData = await axios.get(
        "http://localhost:4000/api/utilities/org/" + user + "/" + eventData.data.organization
      );
      if (memberData.data.member) {
        setMember(true);
      } else {
        setMember(false);
      }
      console.log("MEMBER DATA:", memberData.data.member);
      const registeredData = await axios.get(
        "http://localhost:4000/api/utilities/" + user + "/" + eventID
      );
      if (registeredData.data.registered) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    getInfo().catch((e) => console.log("Error fetching event data on event page:", e));
  }, [eventID]);

  const handleRsvp = async () => {
    const userInfo=JSON.parse(localStorage.getItem('user'))
    console.log("userInfo: ", userInfo);
    const body = {
      user: userInfo.id,
      event: eventID
    };

    await axios.patch(
      "http://localhost:4000/api/users/register",
      body
    ).then((rsvp) => {
      if (rsvp.data.registered) {
        setActive(true);
        setEventData(prevState => {
          alert("Succeeded!")
          return{
            ...prevState, attending : prevState.attending + 1
          }})
      } else {
        setActive(false);
        setEventData(prevState => {
          return{
            ...prevState, attending : prevState.attending - 1
          }})
      }
      let userData=JSON.parse(localStorage.getItem('user'))
      userData ={...userData, events_registered: eventData.events_registered}
      userData = JSON.stringify(userData)
      localStorage.setItem("user", userData)
    }).catch((error) => {
      console.log(error)
      alert("Can't RSVP for this event anymore!")
    })
  };

  if(!eventData)
    return (
      <LoadingIndicator>
        <HashLoader size="150px" color={theme.main}/>
      </LoadingIndicator>
    )

  return (
    <EventContainer>
      <LeftColumnEvent>
        <ImageDivEvent>
          <ImageEvent src={eventData.image} />
        </ImageDivEvent>
        <SecurityMessage>
          Buzz takes your privacy and security seriously. <br />
          Your tickets are secured by advanced encryption and stored in a
          personal QR code.
        </SecurityMessage>
      </LeftColumnEvent>

      <EventRightColumn>
        <EventHeader>{eventData.title}</EventHeader>
        <MainInfo>
          <InfoLeftColumn>
            <EventOrgLink to={"/organization-page/" + eventData.organization}>
              <OrganizerEvent> {eventData.organization_name}</OrganizerEvent> 
            </EventOrgLink>
            
            <CapacityDiv>
              <IoPersonOutline />
              <CapacityEvent>
                {eventData.attending} / {eventData.capacity}{" "}
              </CapacityEvent>
            </CapacityDiv>
            <LocationEvent>
              <IoLocationOutline />
              <h3> {eventData.location} </h3>
            </LocationEvent>
            <EventDateDiv>
              <IoCalendarClearOutline />

              <DateEvent>{formatUnixTime(eventData.date)}</DateEvent>
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
            <h4> Price: {eventData.ticketed ? "$" + eventData.price : "Free!"}</h4>
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
          <p>{eventData.description}</p>
        </EventDescription>
      </EventRightColumn>
    </EventContainer>
  );
};

export default EventPage;
