
import { LeftColumnUser, RightColumnUser } from "./styles/UserBottom.styled";
import {
  UserProfile,
  StyledUserAvatar,
  StyledUserInfo,
} from "./styles/UserProfile.styled";
// import ExampleEvents from "../../assets/ExampleEvents.json"
// import UserEventCard from "../../components/UserPage/UserEventCard"
const user = JSON.parse(localStorage.getItem('user'))
const UserPage = () => {

  const avatarString = "https://avatars.dicebear.com/api/initials/" + user.name +".svg"

  return (
    <>
      <UserProfile>
        <StyledUserAvatar src={avatarString} />
        <StyledUserInfo>
          <h2>{user.name}</h2>
          <p>
            {" "}
            <strong>Email:</strong> {user.email} <br />
            <strong>Major:</strong> {user.major}
          </p>
        </StyledUserInfo>
      </UserProfile>

      <LeftColumnUser>
        <h2>Your Tickets</h2>
      </LeftColumnUser>
      <RightColumnUser>
        <h2>Your Organizations</h2>
      </RightColumnUser>
      {/* {ExampleEvents.map((item, index) => (
        <UserEventCard key={index} item={item } />
      ))} */}
    </>
  );
};

export default UserPage;
