import styled from "styled-components";

export const LeftColumnEvent = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
margin-top: 100px;
width: 30%;
@media (max-width: ${({ theme }) => theme.mobile}) {
  width: 100%;
}
`;

export const ImageDivEvent = styled.div`
    aspect-ratio: 4/4;
`

export const ImageEvent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 3px 5px;
`;


export const SecurityMessage = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 1rem;
`;
