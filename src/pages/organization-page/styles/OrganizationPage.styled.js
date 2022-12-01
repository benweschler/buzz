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
  margin-left: 80px;
  top: 40%;
  border-radius: 5px;
  outline: none;
  display: block;
  margin-top: -50px;
  z-index: 200;
  height: 15rem;
  width: 15rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 20rem;
    height: 20rem;
    margin-left: auto;
    margin-right: auto;
  }
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const StyledOrgContainer = styled.div`
  padding-top: 10px;
  display: flex;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    padding-top: 30px;
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

export const StyledOrgButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  margin-top: -80px;
  background: ${({ theme }) => theme.card};
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  margin-left: 80%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: fixed;
    bottom: 10px;
    width: 90%;
    margin: auto;
    margin-left: 70%;
    justify-content: flex-end;
    z-index: 200;
  }
`;

export const StyledOrgButton = styled.button`
  background: #ff4742;
  border: 1px solid #ff4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  margin: 15px 15px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 100px;

  :hover,
  :active {
    /* background-color: initial;
    background-position: 0 0;
    color: #FF4742; */
    filter: brightness(85%);
    transition: filter 100ms ease-in;
  }

  .activated {
    background: green;
  }

  :active {
    opacity: 0.5;
  }
`;
