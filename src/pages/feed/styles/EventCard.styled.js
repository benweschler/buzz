import styled from "styled-components";
import Color from "color";
import {Link} from "react-router-dom";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.2rem;
  position: relative;
  justify-content: start;
  cursor: pointer;
  height: 25rem;

  img {
    height: 45%;
    object-fit: cover;
  }

  .overflow-field {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
  }
`

export const EventCardBody = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-flow: column wrap;
  gap: 0.5rem;
`

export const CardBodyTopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Date = styled.div`
  font-size: 0.9rem;
  color: grey;
`

export const PriceChip = styled.div`
  border-radius: 10px;
  background: ${props => Color(props.theme.main).alpha(0.5)};
  padding: 5px 7px;
  font-weight: 600;
  font-size: 15px;
  width: min-content;
`

export const TitleLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 700;
  align-self: start;

  &:hover {
    text-decoration: underline;
    //TODO remove
    color: ${({theme}) => theme.text};
  }
`

export const OrganizerLink = styled(Link)`
  color: ${props => props.theme.main};
  font-size: 1rem;
  font-weight: 600;
  align-self: start;
  z-index: 500;
  &:hover {
    text-decoration: underline;
  }
`

export const Location = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  white-space: pre;
`

export const Attendees = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  white-space: pre;
`

export const Tags = styled.div`
  font-size: 0.8rem;
  color: grey;
  position: absolute;
  bottom: 0.75rem;
`
