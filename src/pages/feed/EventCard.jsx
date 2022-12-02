import {IoPeople} from "react-icons/io5";
import {ImLocation2} from "react-icons/im";
import {
  Attendees,
  Card,
  CardBodyTopRow,
  Date,
  EventCardBody,
  Location,
  OrganizerLink,
  PriceChip,
  Tags,
  TitleLink,
} from "./styles/EventCard.styled";
import formatUnixTime from "../../utils/dateUtils";

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
  onImageError,
}) {
  return (
    <Card className="card">
      <img src={image} alt={title} onLoad={onImageLoad} onError={() => onImageError(title)}/>
      <EventCardBody>
        <CardBodyTopRow>
          <Date>{formatUnixTime(date)}</Date>
          {price !== 0 ? <PriceChip>{"$" + price}</PriceChip> : null}
        </CardBodyTopRow>
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
      </EventCardBody>
    </Card>
  );
}
