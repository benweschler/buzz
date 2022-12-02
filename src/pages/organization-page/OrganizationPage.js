import {
  BannerOrg,
  BannerImage,
  BannerImageBlurred,
  BannerText,
} from "./styles/OrganizationBanner.styled"
import {
  OrganizationDescription,
  OrganizationEventsDiv,
  OrgButton,
  OrgButtonDiv,
  OrgBottomContainer,
  OrgEvent,
  OrgLeftColumn,
  OrgRightColumn,
} from "./styles/OrganizationBottom.styled";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const OrganizationPage = () => {
  // const location = useLocation()
  // const {organizationID} = location.state
  const organizationID = "5vJvgrDO0740G6gwvF1k";

  const [orgData, setOrgData] = useState({});
  const [follow, setFollow] = useState(false);
  const [join, setJoin] = useState(false);
  useEffect(() => {
    console.log("useEffect query in OrganizationPage")
    const readOrg = async () => {
      const data = await axios.get(
        "http://localhost:4000/api/organizations/" + organizationID
      );
      console.log(data.data);
      setOrgData(data.data);
    };

    const getOrgRelation = async () => {
      const user = "gygBGe9hAjfKtcguPC6LgIb3bLl2";
      const data = await axios.get(
        "http://localhost:4000/api/utilities/org/" + user + "/" + organizationID
      );
      if (data.data.following) {
        setFollow(true);
      } else {
        setFollow(false);
      }
      if (data.data.member) {
        setJoin(true);
      } else {
        setJoin(false);
      }
    };
    readOrg().catch(console.error);
    getOrgRelation().catch(console.error);
  }, []);

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
  return (
    <>
      <BannerOrg>
        <BannerImageBlurred src={orgData.image} />
        <BannerText>{orgData.name}</BannerText>
        <BannerImage src={orgData.image} />
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
      </BannerOrg>

      <OrgBottomContainer>
        <OrgLeftColumn>
          <OrganizationDescription>
            <h2> About </h2>
            <p>{orgData.description}</p>
          </OrganizationDescription>
        </OrgLeftColumn>

        <OrgRightColumn>
          <h2> Our Events:</h2>
          <OrganizationEventsDiv>
            {/* {console.log(orgData.events)}
              {orgData.events.forEach(event=>{
                renderName(event)
              })} */}
          </OrganizationEventsDiv>
        </OrgRightColumn>
      </OrgBottomContainer>
    </>
  );
};

export default OrganizationPage;
