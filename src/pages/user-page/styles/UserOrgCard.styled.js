import styled from "styled-components";


export const OrgCardWrapper = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.body};
  flex-direction: row;    
  height: 9rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 3px 5px 9px;
  border-radius: 0.5rem;
  transition: transform 250ms ease-in, box-shadow 250ms ease-in;
  align-items: center;
  gap: 1rem;
  overflow: hidden;


  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
  }
`

export const ImgOrgCard = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
`

export const TitleOrgCard = styled.h2`
  font-weight: 400;
  width: 100%;
  justify-content: center;
`