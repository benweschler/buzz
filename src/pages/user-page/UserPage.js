import { useState } from "react";
import { useEffect } from "react";
import {
  LeftColumnUser,
  OrgTopRow,
  RightColumnUser,
  TicketHeaderUser,
  TicketsContainer,
  UserColumnDiv,
  UserTicketsDiv,
} from "./styles/UserBottom.styled";
import {
  UserProfile,
  StyledUserAvatar,
  StyledUserInfo,
} from "./styles/UserProfile.styled";
// import ExampleEvents from "../../assets/ExampleEvents.json"
// import UserEventCard from "../../components/UserPage/UserEventCard"
import axios from "axios";
import { LoadingIndicator } from "../feed/styles/Feed.styled";
import { HashLoader } from "react-spinners";
import { useTheme } from "styled-components";
import buildEventCards from "../../utils/buildEventCards";
import OrgCard from "./OrgCard";
import { EventOrgLink } from "../event-page/styles/EventPageInfoPanel.styled";
import { CreateEventButton } from "../organization-page/styles/OrganizationBottom.styled";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);

    const readUser = async () => {
      const data = await axios.get(
        'http://localhost:4000/api/users/' + localUser.id
      );

      setUserData(data.data);
    };

    readUser().catch(() => {
      console.log("ERROR");
    });
  }, []);

  if (!userData || !user)
    return (
      <LoadingIndicator>
        <HashLoader size="150px" color={theme.main} />
      </LoadingIndicator>
    );

  const avatarString =
    "https://avatars.dicebear.com/api/initials/" + user.name + ".svg";

  return (
    <>
      <UserProfile>
        <StyledUserAvatar src={user.image} alt={avatarString} />
        <StyledUserInfo>
          <h2>{user.name}</h2>
          <p>
            {" "}
            <strong>Email:</strong> {user.email} <br />
            <strong>Major:</strong> {user.major}
          </p>
        </StyledUserInfo>
      </UserProfile>

      <UserColumnDiv>
        <LeftColumnUser>
          <TicketHeaderUser>
            <h2>Your Tickets</h2>
          </TicketHeaderUser>

          <UserTicketsDiv>
            <TicketsContainer>
              {buildEventCards(userData.events_registered)}
            </TicketsContainer>
          </UserTicketsDiv>
        </LeftColumnUser>
        <RightColumnUser>
          <OrgTopRow>
            <h2>Your Organizations</h2>
            <EventOrgLink to={"/create-organization"}>
              <CreateEventButton> Create Organization </CreateEventButton>
            </EventOrgLink>
          </OrgTopRow>

          <UserTicketsDiv>
            {buildOrgData(userData.organizations)}
          </UserTicketsDiv>
        </RightColumnUser>
      </UserColumnDiv>
    </>
  );
};

function buildOrgData(orgData) {
  return orgData.map((org) => <OrgCard name={org.name} image={org.image} id={org.id}/>);
}

export default UserPage;
