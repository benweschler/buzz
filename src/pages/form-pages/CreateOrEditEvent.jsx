import CreateEvent from "./components/CreateEvent"
import EditEvent from "./components/EditEvent"
import { useLocation } from 'react-router-dom'

function CreateOrEditEvent() {
    const location = useLocation();
    const OrganizationID = location.state({OrganizationID});
    const EventID = location.state({EventID});

    return(
        EventID === undefined ? 
        <CreateEvent OrgID={OrganizationID} />
            :
        <EditEvent EventID={EventID} />
    )
}

export default CreateOrEditEvent;