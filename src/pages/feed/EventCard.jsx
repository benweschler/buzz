import {IoPeople} from "react-icons/io5";
import {ImLocation2} from "react-icons/im";
import {
  Attendees,
  Card,
  Date,
  EventCardBody,
  Location,
  OrganizerLink,
  PriceChip,
  Tags,
  TitleLink,
} from "./styles/EventCard.styled";

export default function EventCard({
  eventID,
  title,
  image,
  date,
  organization,
  organizationID,
  location,
  attendees,
  price,
  tags,
  onImageLoad,
}) {
  return (
    <Card className="card">
      <img src={image} alt={title} onLoad={onImageLoad}/>
      <EventCardBody>
        <Date>{date}</Date>
        <TitleLink
          className="overflow-field"
          to="/event-page"
          state={{eventID: eventID}}
        >
          {title}
        </TitleLink>
        <OrganizerLink
          className="overflow-field"
          to="/organization-page"
          state={{organizationID: organizationID}}
        >
          {organization}
        </OrganizerLink>
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
