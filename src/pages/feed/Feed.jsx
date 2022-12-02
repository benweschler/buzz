import {useEffect, useState} from 'react';
import EventCard from './EventCard'
import Constants from '../../constants/Constants'
import FilterChip from "./FilterChip";
import TonightButton from "./TonightButton"
import {
  EventView,
  FilterRow,
  LoadingIndicator,
  Scaffold,
  Wrapper
} from "./styles/Feed.styled";
import {useTheme} from "styled-components";
import axios from "axios";
import {HashLoader} from 'react-spinners'
import {fireAfterCalls} from "../../utils/fireAfterCalls";

export default function Feed({toggleTheme}) {
  const [selectedTags, setSelectedTags] = useState([])
  const [events, setEvents] = useState([])
  const theme = useTheme()
  useEffect(() => {
    async function getEvents() {
      return axios.put(
        "http://localhost:4000/api/utilities/filter",
        {tags: [], tonight: theme.brightness === "dark"}
      ).then((response) => setEvents(response["data"].events))
    }

    setEvents([])
    getEvents().catch((e) => console.log("ERROR WITH FETCHING EVENTS:", e))
    console.log(events);
  }, [theme.brightness])


  function filter(element) {
    for (let tag of selectedTags) {
      if (!element.tags.includes(tag)) return false;
    }

    return true;
  }

  return (
    <Scaffold>
      <Wrapper>
        <h1>Popular Events <span style={{color: "#a4a4a4"}}>at UCLA</span></h1>
        <TonightButton toggleTheme={toggleTheme}/>
        <FilterRow>
          {TagFilters(selectedTags, setSelectedTags)}
        </FilterRow>
        <EventCards events={events} filter={filter}/>
      </Wrapper>
    </Scaffold>
  );
}

function EventCards({events, filter}) {
  const [imagesAreLoading, setImagesAreLoading] = useState(true)
  const theme = useTheme()

  const cards = [];
  if (events.length === 0) return cards

  const onImageLoad = fireAfterCalls(
    events.length,
    () => {
      setImagesAreLoading(false)
    }
  )

  events = events.filter(filter)
  for (let event of events) {
    cards.push(
      <EventCard
        key={event.id}
        title={event.title}
        organizer={event.organization_name}
        image={event.image}
        description={event.description}
        attendees={event.attendees.length}
        location={event.location}
        price={event.price}
        tags={event.tags}
        date={event.date}
        //Extras for passing to event-page
        organizationId={event.organization}
        capacity={event.capacity}
        ticketed={event.ticketed}
        eventId={event.id}
        // Track image load status
        onImageLoad={onImageLoad}
      />
    );
  }

  return (
    <>
      {imagesAreLoading &&
        <LoadingIndicator>
          <HashLoader size="150px" color={theme["main"]}/>
        </LoadingIndicator>
      }
      <EventView visible={!imagesAreLoading}>
        {cards}
      </EventView>
    </>
  );
}

function TagFilters(selectedTags, setSelectedTags) {
  let filters = []
  for (let [name, icon] of Object.entries(Constants.tags)) {
    filters.push(
      <FilterChip
        key={name}
        selected={selectedTags.includes(name)}
        icon={icon}
        name={name}
        onClick={() => setSelectedTags(
          selectedTags.includes(name)
            ? selectedTags.filter(e => e !== name)
            : [...selectedTags, name]
        )}
      />
    )
  }

  return filters;
}
