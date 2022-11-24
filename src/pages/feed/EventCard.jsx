import styled from "styled-components";
import {IoPeople} from "react-icons/io5";
import {ImLocation2} from "react-icons/im"
import Color from "color";
import Constants from "../../constants/Constants.js";

export default function EventCard(
  {title, image, date, organizer, location, attendees, price, tags}) {
  return (
    <Card className="card">
      <img src={image} alt={title}/>
      <div className="cardBody">
        <div className="date">{date}</div>
        <h3 className="title overflow-field">{title}</h3>
        <div className="organizer overflow-field">{organizer}</div>
        <div className="location"><ImLocation2/>{" " + location}</div>
        <div className="attendees"><IoPeople/>{" " + attendees} attending</div>
        <div className="tags">
          {tags.map((id) => Constants.tags[id].name).join(" • ")}
        </div>
        {price !== 0 ? <PriceChip>{"$" + price}</PriceChip> : null}
      </div>
    </Card>
  );
}

const Card = styled.div`
  overflow: hidden;
  border-radius: 0.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  cursor: pointer;
  transition: box-shadow 150ms ease-in, transform 150ms ease-in;
  min-height: 25rem;

  img {
    height: 45%;
    object-fit: cover;
  }

  .cardBody {
    padding: 0.75rem;
    display: flex;
    flex-flow: column wrap;
    gap: 0.5rem;
  }

  .date {
    font-size: 0.9rem;
    color: grey;
  }

  .tags {
    font-size: 0.8rem;
    color: grey;
    position: absolute;
    bottom: 0.75rem;
  }

  .location {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    white-space: pre;
  }

  .attendees {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    white-space: pre;
  }

  .overflow-field {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .organizer {
    color: ${props => props.theme.main};
    font-weight: 600;
    align-self: start;
  }

  .organizer:hover {
    text-decoration: underline;
  }

  &:hover {
    box-shadow: ${({theme}) => theme.brightness === 'light' 
            ? '0 10px 30px rgba(0, 0, 0, 0.2)' 
            : null};
    transform: scale(1.01);
  }

  .title {
    align-self: start;
  }

  .title:hover {
    text-decoration: underline;
  }
`;

const PriceChip = styled.div`
  border-radius: 10px;
  background: ${props => Color(props.theme.main).alpha(0.5)};
  padding: 5px 7px;
  font-weight: 600;
  font-size: 15px;
  width: min-content;
  align-self: end;
  position: absolute;
`;
