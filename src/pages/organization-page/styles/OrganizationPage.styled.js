import styled from "styled-components";

export const StyledBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: black;
  border-radius: 3px;
  margin: auto;
  height: 500px;
  padding-top: 100px;
  

`;

export const StyledBannerImageBlurred = styled.img`
  filter: blur(1px) brightness(70%);
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  margin: auto;
  /* transform: scale(1.32);  */
  
`;

export const StyledBannerImage = styled.img`
  overflow: hidden;
  width: 30%;
  margin-left: 80px;
  top: 40%;
  border-radius: 5px;
  outline: none;
  display: block;
  margin-top: -10%;
  z-index: 200;
  height: 15rem;
  width: 15rem;
`;

export const StyledBannerText = styled.h2`
  color: white;
  position: absolute;
  top: 30%;
  left: 40%;
  font-size: 2.5rem;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    top: 20%;
    left: 30%;
  }
`;

export const StyledOrganizationEvents = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
`;

export const StyledOrganizationDescription = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const StyledOrgContainer = styled.div`
  padding-top: 10px;
  display: flex;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }

`;

export const StyledOrgLeftColumn = styled.div`
  float: left;
  width: 45%;
  text-align: start;
  margin: auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;

export const StyledOrgRightColumn = styled.div`
  float: left;
  width: 55%;
  text-align: start;
  padding-left: 20px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    padding-left: 0px;
  }
`;


