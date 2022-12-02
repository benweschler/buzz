import EventCard from "../pages/feed/EventCard";


function buildEventCards(events) {
    const cards = []
  
    // TODO: sometimes, we're getting different number of events from the API call for an org.
    // This ensures each card has a unique key
    let keySuffix = 0;
    for(const event of events) {
      cards.push(
        <EventCard
          key={"" + event.id + keySuffix++}
          eventID={event.id}
          title={event.title}
          organization={event.organization_name}
          organizationID={event.organization}
          image={event.image}
          description={event.description}
          attendees={event.attending}
          location={event.location}
          price={event.price}
          tags={event.tags}
          date={event.date}
        />)
    }
  
    return cards
  }

export default buildEventCards