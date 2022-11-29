import Navbar from "../../components/global/Navbar"
import { Container, StyledLeftColumn, StyledRightColumn } from "../../components/styles/Container.styled"
import { StyledBanner, StyledBannerImage, StyledBannerImageBlurred, StyledBannerText, StyledEventsHeader, StyledOrganizationDescription, StyledOrganizationEvents, StyledOrgContainer } from "../../components/styles/OrganizationPage.styled"
import RoyceHall from "../../assets/images/Royce-Hall.jpg"

const OrganizationPage = () => {
  return (
    <>
        <Navbar />
        <StyledBanner>
            <StyledBannerImageBlurred src={RoyceHall}/>  
            <StyledBannerText>
                Royce Theater Club    
            </StyledBannerText> 
            <StyledBannerImage src={RoyceHall} />
                
        </StyledBanner> 


        <StyledOrgContainer>
            <StyledLeftColumn>
            <Container>
                
                <StyledOrganizationDescription>
                    <p>
                        Welcome to Royce Theater Club! <br/>
                        We are happy you're here, Please check out our events!
                    </p>
                </StyledOrganizationDescription>   
                
            </Container>
            
            </StyledLeftColumn>
            
            <StyledRightColumn>
                <Container>
                    <StyledOrganizationEvents>
                        <h2> Our Events:</h2>
                    
                    </StyledOrganizationEvents>

                </Container>
                
            </StyledRightColumn>

        </StyledOrgContainer>
       
        
    </>
    
  )
}

export default OrganizationPage