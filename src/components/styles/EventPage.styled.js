import styled from "styled-components";


export const StyledEventLeftColumn = styled.div`
    float: left;
    display:flex;
    justify-content: center;
    padding-top: 100px;  
    width: 30%;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100%;
    }
`
export const StyledEventRightColumn = styled.div`
    float: left;
    padding-top: 100px;
    padding-left: 50px;
    width: 70%;
`

export const StyledEventImage = styled.img`
    aspect-ratio: 4/4;
    object-fit: cover;
    border-radius: 10px;
`

export const StyledEventMainInfo = styled.div`
    padding-top: 10px;
`

export const StyledEventHeader = styled.h1`
    font-size: 2.5rem;
    font-family: 'Montserrat', serif;
`

export const StyledEventDescription = styled.div`

`

