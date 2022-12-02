import {
  BannerOrg,
  BannerImageBlurred,
  BannerText,
} from "./styles/OrganizationBanner.styled";
import {
  OrganizationDescription,
  OrganizationEventsDiv,
  OrgButton,
  OrgButtonDiv,
  OrgBottomContainer,
  OrgEventsContainer,
  EventsHeaderOrg,
  CreateEventButton,
  OrgTopRow,
  OrgBottomRow,
} from "./styles/OrganizationBottom.styled";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EventCard from "../feed/EventCard";
import { EventOrgLink } from "../event-page/styles/EventPageInfoPanel.styled";
import { LoadingIndicator } from "../feed/styles/Feed.styled";
import { HashLoader } from "react-spinners";
import { useTheme } from "styled-components";

const OrganizationPage = () => {
  const params = useParams();
  const organizationID = params.id;

  const [orgData, setOrgData] = useState(null);
  const [follow, setFollow] = useState(false);
  const [join, setJoin] = useState(false);

  const theme = useTheme()

  useEffect(() => console.log("EFFECT2"), [])

  useEffect(() => {
    console.log("useEffect query in OrganizationPage");
    const getInfo = async () => {
      const organizationData = await axios.get(
        "http://localhost:4000/api/organizations/" + organizationID
      );
      setOrgData(organizationData.data);

      const user = JSON.parse(localStorage.getItem("user")).id;
      const followData = await axios.get(
        "http://localhost:4000/api/utilities/org/" + user + "/" + organizationID
      );

      if (followData.data.following) {
        setFollow(true);
      } else {
        setFollow(false);
      }
      if (followData.data.member) {
        setJoin(true);
      } else {
        setJoin(false);
      }

    }

    console.log("EFFECT")
    getInfo().catch(console.error);
  }, [organizationID]);

  const handleFollow = async () => {
    const body = {
      user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      organization: "AO0movdTMMnS3wfVHhGC",
    };
    const doFollow = await axios.patch(
      "http://localhost:4000/api/users/follow",
      body
    );
    console.log(doFollow.data.following);
    if (doFollow.data.following) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  };
  const handleJoin = async () => {
    const body = {
      user: "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      organization: "AO0movdTMMnS3wfVHhGC",
    };
    const doJoin = await axios.patch(
      "http://localhost:4000/api/users/add",
      body
    );
    if (doJoin.data.member) {
      setJoin(true);
    } else {
      setJoin(false);
    }
  };

  if(!orgData)
    return (
      <LoadingIndicator>
        <HashLoader size="150px" color={theme.main}/>
      </LoadingIndicator>
    )
  
  return (
    <>
      <BannerOrg>
        <BannerImageBlurred src={orgData.image} />
        <BannerText>{orgData.name}</BannerText>
        {/* <BannerImage src={orgData.image} /> */}
      </BannerOrg>

      <OrgBottomContainer>
        <OrgTopRow>
          <OrganizationDescription>
            <h2> About </h2>
            <p>{orgData.description}</p>
          </OrganizationDescription>
          <OrgButtonDiv>
            
            <OrgButton onClick={handleFollow} following={follow}>
              {" "}
              {follow ? "Following" : "Follow"}{" "}
            </OrgButton>
            <OrgButton onClick={handleJoin} joined={join}>
              {" "}
              {join ? "Joined" : "Join"}
            </OrgButton>
          </OrgButtonDiv>
        </OrgTopRow>

        <OrgBottomRow>
          

          <EventsHeaderOrg>
            <h2> Our Events</h2>
            <EventOrgLink to="/create-event" state={{organizationID: organizationID}}>
              <CreateEventButton> Create Event </CreateEventButton>
            </EventOrgLink>
            
          </EventsHeaderOrg>
          <OrganizationEventsDiv>
            
            <OrgEventsContainer>
              {buildEventCards(orgData.events)}
            </OrgEventsContainer>
          </OrganizationEventsDiv>
          
        </OrgBottomRow>
      </OrgBottomContainer>
    </>
  );
}

function buildEventCards(events) {
  const cards = []

  // TODO: sometimes, we're getting different number of events from the API call for an org.
  // This ensures each card has a unique key
  let keySuffix = 0;
  for(const event of events) {
    cards.push(
      <EventCard
        key={"" + event.id + keySuffix++}
        eventID={event.id}
        title={event.title}
        organization={event.organization_name}
        organizationID={event.organization}
        image={event.image}
        description={event.description}
        attendees={event.attendees.length}
        location={event.location}
        price={event.price}
        tags={event.tags}
        date={event.date}
      />)
  }

  return cards
}

export default OrganizationPage;
