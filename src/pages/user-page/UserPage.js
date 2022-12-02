
import { useState } from "react";
import { useEffect } from "react";
import { LeftColumnUser, RightColumnUser, UserColumnDiv } from "./styles/UserBottom.styled";
import {
  UserProfile,
  StyledUserAvatar,
  StyledUserInfo,
} from "./styles/UserProfile.styled";
// import ExampleEvents from "../../assets/ExampleEvents.json"
// import UserEventCard from "../../components/UserPage/UserEventCard"
import axios from 'axios';
import { LoadingIndicator } from "../feed/styles/Feed.styled";
import { HashLoader } from "react-spinners";
import { useTheme } from "styled-components";

const UserPage = () => {

  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)

  const theme = useTheme()

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    setUser(localUser)

    const readUser = async () => {
      const data = await axios.get(
        "http://localhost:4000/api/users/" + localUser.id
      );
      console.log(data.data);
      setUserData(data.data);
    };


    readUser().catch(() => {
      console.log('ERROR');
    })

  },[]);

  if(!userData)
    return (
      <LoadingIndicator>
        <HashLoader size="150px" color={theme.main}/>
      </LoadingIndicator>
    )

  const avatarString = "https://avatars.dicebear.com/api/initials/" + user.name +".svg"

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
          <h2>Your Tickets</h2>
        </LeftColumnUser>
        <RightColumnUser>
          
          <h2>Your Organizations</h2>
          {buildOrgData(userData.organizations)}
        </RightColumnUser>
      </UserColumnDiv>
      
      {/* {ExampleEvents.map((item, index) => (
        <UserEventCard key={index} item={item } />
      ))} */}
    </>
  );
};

function buildOrgData(orgData) {
  const organizationObjects = JSON.parse(localStorage.getItem('user')).organizations;
  console.log(organizationObjects);
  return (
    organizationObjects.map((org) =>
      <h1 key={org.id}>{org.name}</h1>
    )
  )
}

export default UserPage;
