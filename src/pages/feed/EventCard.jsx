import styled from "styled-components";
import {IoPeople} from "react-icons/io5";
import {ImLocation2} from "react-icons/im"

export default function EventCard(
  {title, image, date, organizer, location, attendees, price}) {
  return (
    <Card>
      <img src={image} alt={title}/>
      <div className="cardBody">
        <div className="date">{date}</div>
        <h3 className="title">{title}</h3>
        <div className="organizer">{organizer}</div>
        <div className="location"><ImLocation2/>{" " + location}</div>
        <div className="attendees"><IoPeople/>{" " + attendees} attending</div>
        <div className="tags">{["ART", "MUSIC", "DANCE"].join(" • ")}</div>
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
  background: white;
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

  .organizer {
    color: #c94210;
    font-weight: 600;
    align-self: start;
  }

  .organizer:hover {
    text-decoration: underline;
  }

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  background: rgba(201, 66, 16, 0.5);
  padding: 5px 7px;
  font-weight: 600;
  font-size: 15px;
  width: min-content;
  align-self: end;
  position: absolute;
`;
