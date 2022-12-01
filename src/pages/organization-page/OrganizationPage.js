import { Container } from "../../components/global/styles/Container.styled";
import {
  StyledBanner,
  StyledBannerImage,
  StyledBannerImageBlurred,
  StyledBannerText,
  StyledOrganizationDescription,
  StyledOrganizationEvents,
  StyledOrgButton,
  StyledOrgButtonDiv,
  StyledOrgContainer,
  StyledOrgLeftColumn,
  StyledOrgRightColumn,
} from "./styles/OrganizationPage.styled";
import RoyceHall from "../../assets/images/Royce-Hall.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const OrganizationPage = () => {
  const [follow, setFollow] = useState(false)
  const [join, setJoin] = useState(false)
  useEffect(() => {
    const getOrgRelation = async () => {
      const user="gygBGe9hAjfKtcguPC6LgIb3bLl2"
      const org="AO0movdTMMnS3wfVHhGC"
      const data=await axios.get("http://localhost:4000/api/utilities/org/"+user+"/"+org)
      if(data.data.following)
      {
        setFollow(true)
      }
      else{
        setFollow(false)
      }
      if(data.data.member){
        setJoin(true)
      }
      else{
        setJoin(false)
      }
    }
    getOrgRelation().catch(console.error);
  }, [join, follow]);

  const handleFollow = async() => {
    const body={
      user : "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      organization : "AO0movdTMMnS3wfVHhGC"
    }
    const doFollow=await axios.patch("http://localhost:4000/api/users/follow", body)
    console.log(doFollow.data.following)
    if (doFollow.data.following){
      setFollow(true)
    }
    else{
      setFollow(false)
    }
  }
  const handleJoin=async()=>{
    const body={
      user : "gygBGe9hAjfKtcguPC6LgIb3bLl2",
      organization : "AO0movdTMMnS3wfVHhGC"
    }
    const doJoin=await axios.patch("http://localhost:4000/api/users/add", body)
    if (doJoin.data.member){
      setJoin(true)
    }
    else{
      setJoin(false)
    }
  }
  return (
    <>
      <StyledBanner>
        <StyledBannerImageBlurred src={RoyceHall} />
        <StyledBannerText>Royce Theater Club</StyledBannerText>
        <StyledBannerImage src={RoyceHall} />
        <StyledOrgButtonDiv>
          <StyledOrgButton onClick={handleFollow} following={follow}> {follow ? "Following" : "Follow"} </StyledOrgButton>
          <StyledOrgButton onClick={handleJoin} joined={join}> {join ? "Joined" : "Join" }</StyledOrgButton>

        </StyledOrgButtonDiv>

      </StyledBanner>

      <StyledOrgContainer>
        <StyledOrgLeftColumn>
          <Container>
            <StyledOrganizationDescription>
              <h2> About </h2>
              <p>
                Welcome to Royce Theater Club! <br />
                We are happy you're here, Please check out our events!!
              </p>
            </StyledOrganizationDescription>
          </Container>
        </StyledOrgLeftColumn>

        <StyledOrgRightColumn>
          <Container>
            <StyledOrganizationEvents>
              <h2> Our Events:</h2>
            </StyledOrganizationEvents>
          </Container>
        </StyledOrgRightColumn>
      </StyledOrgContainer>
    </>
  );
};

export default OrganizationPage;
