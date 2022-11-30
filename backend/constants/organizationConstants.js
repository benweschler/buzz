// Organizer Constants
const ORGANIZATION_DESCRIPTION = "description";
const EVENTS = "events";
const FOLLOWERS = "followers";
const MEMBERS = "members";
const ORGANIZATION_NAME = "name";
const ID = "id";
const SOURCE = "image";
const MEMBER = "member"; // Member who originally created this organization

const INITIAL_ORGANIZATION_KEYS = [ORGANIZATION_DESCRIPTION, ORGANIZATION_NAME, MEMBER];

const UPLOAD_KEYS = [ID, SOURCE];

module.exports = {
    INITIAL_ORGANIZATION_KEYS,
    UPLOAD_KEYS,
}