import styled from "styled-components";


export const OrgCardWrapper = styled.div`
    display: flex;
    background-color: rgba(0, 0, 0, 0.05);
    flex-direction: row;    
    height: 9rem;
    width: 100%;
    margin: 0.5rem auto;
    box-shadow: rgba(0, 0, 0, 0.1) 3px 5px 9px;
    border-radius: 10px;
    

    &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
    transition: transform 250ms ease-in;
  }
`

export const OrgCardImgDiv = styled.div`
    object-fit: cover;
    display: flex;
    width: 40%;
    height: 100%;
    padding: 10px 10px; 
    align-items: center;
    justify-content: center;
    
`

export const ImgOrgCard = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 3px 5px 7px;     
`

export const TitleDivOrgCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
`

export const TitleOrgCard = styled.h2`
    font-weight: 400;
`