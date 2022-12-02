import {useEffect, useState} from 'react';
import EventCard from './EventCard'
import Constants from '../../constants/Constants'
import FilterChip from "./FilterChip";
import TonightButton from "./TonightButton"
import {
  EventView,
  FilterRow, ImageLoadError,
  LoadingIndicator,
  Scaffold,
  Wrapper,
} from "./styles/Feed.styled";
import {useTheme} from "styled-components";
import axios from "axios";
import {HashLoader} from 'react-spinners'
import QRScannerButton from "./QRScannerButton";
import FollowingButton from "./FollowingButton";

export default function Feed({toggleTheme}) {
  const [selectedTags, setSelectedTags] = useState([])
  const [events, setEvents] = useState([])
  const theme = useTheme()
  useEffect(() => {
    console.log("useEffect query in Feed")

    async function getEvents() {
      return axios.put(
        'http://localhost:4000/api/utilities/filter',
        {tags: [], tonight: theme.brightness === "dark"}
      ).then((response) => setEvents(response["data"].events))
    }

    getEvents().catch((e) => console.log("ERROR WITH FETCHING EVENTS:", e))
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
        <QRScannerButton/>
        <h1>Popular Events <span style={{color: "grey"}}>at UCLA</span></h1>
        <TonightButton toggleTheme={toggleTheme}/>
        <FollowingButton/>
        <FilterRow>
          {renderTagFilters(selectedTags, setSelectedTags)}
        </FilterRow>
        <EventCards events={events} filter={filter}/>
      </Wrapper>
    </Scaffold>
  );
}

function EventCards({events, filter}) {
  const [numLoadedImages, setNumLoadedImages] = useState(0)
  const [imagesAreLoading, setImagesAreLoading] = useState(true)
  const [failedImageLoads, setFailedImageLoads] = useState([])
  const theme = useTheme()

  useEffect(() => {
    if(numLoadedImages >= events.length)
      setImagesAreLoading(false)
  }, [numLoadedImages, events.length])

  const cards = [];
  if (events.length === 0) return cards

  const onImageLoad = () => setNumLoadedImages(prevState => prevState + 1)

  const onImageError = (eventTitle) =>
    setFailedImageLoads(prev => [...prev, eventTitle])

  events = events.filter(filter)
  for (let event of events) {
    cards.push(
      <EventCard
        key={event.id}
        eventID={event.id}
        title={event.title}
        organization={event.organization_name}
        organizationID={event.organization}
        image={event.image}
        description={event.description}
        attendees={event.attendees.length}
        location={event.location}
        price={event.price}
        tags={event.tags}
        date={event.date}
        onImageLoad={onImageLoad}
        onImageError={onImageError}
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
      {failedImageLoads.length !== 0 &&
        <ImageLoadError>
          Failed to load images for the following events:
          {" " + failedImageLoads.join(", ")}
        </ImageLoadError>
      }
      <EventView visible={!imagesAreLoading}>
        {cards}
      </EventView>
    </>
  );
}

function renderTagFilters(selectedTags, setSelectedTags) {
  let filters = []
  for (const [name, icon] of Object.entries(Constants.tags)) {
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
