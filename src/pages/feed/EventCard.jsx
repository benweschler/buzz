import { IoPeople } from "react-icons/io5";
import { ImLocation2 } from "react-icons/im";
import {
  Attendees,
  Card,
  Date,
  EventCardBody,
  Location,
  Organizer,
  PriceChip,
  Tags,
  Title,
} from "./styles/EventCard.styled";
import { useNavigate } from "react-router-dom";

export default function EventCard({
  title,
  image,
  date,
  organizer,
  location,
  attendees,
  price,
  tags,
  organizationId,
  description,
  capacity,
  ticketed,
  eventId,
}) {
  const navigate = useNavigate();
  return (
    <Card
      className="card"
      onClick={() => {
        navigate("/event-page", {
          state: {
            title: title,
            image: image,
            date: date,
            organizer: organizer,
            location: location,
            attendees: attendees,
            price: price,
            tags: tags,
            organizationId: organizationId,
            description: description,
            capacity: capacity,
            ticketed: ticketed,
            eventId: eventId
          },
        });
      }}
    >
      <img src={image} alt={title} />
      <EventCardBody>
        <Date>{date}</Date>
        <Title className="overflow-field">{title}</Title>
        <Organizer className="overflow-field">{organizer}</Organizer>
        <Location>
          <ImLocation2 />
          {" " + location}
        </Location>
        <Attendees>
          <IoPeople />
          {" " + attendees} attending
        </Attendees>
        <Tags>{tags.join(" • ")}</Tags>
        {price !== 0 ? <PriceChip>{"$" + price}</PriceChip> : null}
      </EventCardBody>
    </Card>
  );
}
