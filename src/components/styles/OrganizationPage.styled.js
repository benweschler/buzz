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
    
    
`

export const StyledBannerImageBlurred = styled.img`
    filter: blur(1px) brightness(70%);
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
    margin: auto;
    /* transform: scale(1.32);  */
    overflow: hidden;
  
`   

export const StyledBannerImage = styled.img`
    overflow: visible;
    width: 30%;
    margin-left: 220px;   
    top: 40%;
    border-radius: 5px;
    
    outline: none;
    display: block;
    margin-top: -10%;
    z-index: 200;
    height: 15rem;
    width: 15rem;

    

`

export const StyledBannerText = styled.h2`
    color: white;
    position: absolute;
    top: 30%;
    left: 40%;
    font-size: 2.5rem;
`

export const StyledOrganizationEvents = styled.div`
    padding-top: 30px;
`

export const StyledOrganizationDescription = styled.div`
    padding-top: 10px;
    padding-left: 130px;
`

export const StyledOrgContainer = styled.div`
    padding-top: 10px
`