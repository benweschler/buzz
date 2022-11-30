import { Container } from "../../components/global/styles/Container.styled";
import {
  StyledBanner,
  StyledBannerImage,
  StyledBannerImageBlurred,
  StyledBannerText,
  StyledOrganizationDescription,
  StyledOrganizationEvents,
  StyledOrgContainer,
  StyledOrgLeftColumn,
  StyledOrgRightColumn,
} from "./styles/OrganizationPage.styled";
import RoyceHall from "../../assets/images/Royce-Hall.jpg";

const OrganizationPage = () => {
  return (
    <>
      <StyledBanner>
        <StyledBannerImageBlurred src={RoyceHall} />
        <StyledBannerText>Royce Theater Club</StyledBannerText>
        <StyledBannerImage src={RoyceHall} />
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
