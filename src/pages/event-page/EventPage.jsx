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
  LocationEvent,
  MainInfo,
  OrganizerEvent,
  QRDivEvent,
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
import formatUnixTime from "../../utils/dateUtils";
import { useParams } from "react-router-dom";
import { LoadingIndicator } from "../feed/styles/Feed.styled";
import { HashLoader } from "react-spinners";
import { useTheme } from "styled-components";
import QRScannerButton from "./QRScannerButton";
import Constants from "../../constants/Constants";

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
        `${Constants.API_ENDPOINT}/api/events/` + eventID
      );
      setEventData(eventData["data"]);
      const user = JSON.parse(localStorage.getItem("user")).id;
      const memberData = await axios.get(
        `${Constants.API_ENDPOINT}/api/utilities/org/` + user + "/" + eventData["data"].organization
      );
      if (memberData["data"].member) {
        setMember(true);
      } else {
        setMember(false);
      }
      const registeredData = await axios.get(
        `${Constants.API_ENDPOINT}/api/utilities/` + user + "/" + eventID
      );
      if (registeredData["data"].registered) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    getInfo().catch((e) => console.log("Error fetching event data on event page:", e));
  }, [eventID]);

  const handleRsvp = async () => {
    const userInfo=JSON.parse(localStorage.getItem('user'))
    const body = {
      user: userInfo.id,
      event: eventID
    };

    await axios.patch(
      `${Constants.API_ENDPOINT}/api/users/register`,
      body
    ).then((rsvp) => {
      if (rsvp.data.registered) {
        setActive(true);
        setEventData(prevState => {
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
      console.log("Error with API fetch on user page", error)
      alert("Can't RSVP for this event anymore!")
    })
  };

  if(!eventData)
    return (
      <LoadingIndicator>
        <HashLoader size="150px" color={theme["main"]}/>
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
        {member && (
          <QRDivEvent>
            <QRScannerButton eventID={eventID}/>
          </QRDivEvent>
        )}
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
        </MainInfo>

        <RsvpDiv>
          <RsvpAbout>
            <h4> Price: {eventData.ticketed ? "$" + eventData.price : "Free!"}</h4>
            <RsvpMessage>
              No extra upfront costs, or cheeky data mining ????
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
