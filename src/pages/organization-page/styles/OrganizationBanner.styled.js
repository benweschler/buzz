import styled from "styled-components";

export const BannerOrg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: black;
  border-radius: 3px;
  margin: auto;
  height: 500px;
  padding-top: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
`;

export const BannerImageBlurred = styled.img`
  filter: blur(1px) brightness(70%);
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  margin: auto;
  /* transform: scale(1.32);  */
`;

export const BannerImage = styled.img`
  overflow: hidden;
  margin-left: 80px;
  top: 40%;
  border-radius: 5px;
  outline: none;
  display: block;
  object-fit: cover;
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

export const BannerText = styled.h2`
  color: white;
  position: absolute;
  margin: auto;
  align-self: center;
  font-family: 'Montserrat';
  font-style: italic;
  font-size: 4rem;
  font-weight: 800;
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 3rem;
  }
`;
