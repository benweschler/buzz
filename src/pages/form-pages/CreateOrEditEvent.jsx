import CreateEvent from "./components/CreateEvent"
import EditEvent from "./components/EditEvent"
import { useLocation } from 'react-router-dom'

function CreateOrEditEvent(props) {
    const location = useLocation();
    //const OrganizationID = location.state({OrganizationID});
    //const EventID = location.state({EventID});

    return(
        <CreateEvent OrgID={props.orgID} />
    )
}

export default CreateOrEditEvent;