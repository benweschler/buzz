import {IoPeople} from "react-icons/io5";
import {ImLocation2} from "react-icons/im";
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

export default function EventCard({
  title,
  image,
  date,
  organizer,
  location,
  attendees,
  price,
  tags,
  /* TODO: reimplement navigation
  organizationId,
  description,
  capacity,
  ticketed,
  eventId,
  */
  onImageLoad,
}) {
  return (
    <Card className="card">
      <img src={image} alt={title} onLoad={onImageLoad}/>
      <EventCardBody>
        <Date>{date}</Date>
        <Title className="overflow-field">{title}</Title>
        <Organizer className="overflow-field">{organizer}</Organizer>
        <Location>
          <ImLocation2/>
          {" " + location}
        </Location>
        <Attendees>
          <IoPeople/>
          {" " + attendees} attending
        </Attendees>
        <Tags>{tags.join(" • ")}</Tags>
        {price !== 0 ? <PriceChip>{"$" + price}</PriceChip> : null}
      </EventCardBody>
    </Card>
  );
}
