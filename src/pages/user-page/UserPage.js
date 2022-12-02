
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

const UserPage = () => {

  const [user, setUser] = useState({})
  const [userData, setUserData] = useState({})

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
