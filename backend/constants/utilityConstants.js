//tag to doc map

let TAGS = new Map()
TAGS.set("Music","Ay7aqwVdcsGMRfqx5yzB")
TAGS.set("Theater", "Ps02uXiRQZ2ecObbbb1P")
TAGS.set("Athletics","jFfSspkq4qAwWC8Z0Cfw")
TAGS.set("Fundraiser","moWKhStdnEvucdYbpRH2")
TAGS.set("Workshop","NJ9lPvmsCl3dtmLwCbVB")
TAGS.set("North Campus","EpkYSyty7MB8CQcpbjG7")
TAGS.set("South Campus","2JbPIPY6uySq3ycYE1fb")
TAGS.set("Social","ikcCIIfEigajP8M0cb1g")
TAGS.set("Casual","zbIXQsweJw8V6nztcHoS")
TAGS.set("Formal","vzOcnUx571Wa4BSFJdS7")
TAGS.set("Tutoring","Gi9gVzOgp8hWNusWJc0v")
TAGS.set("Sale","p36Z1S5QmbyxlTgopcoc")
TAGS.set("Career Fair","0Za44NuAb1ZeSPb0TUEQ")
TAGS.set("Info Session","CTldhZqB3AcFtu9vCoAh")
TAGS.set( "Other","VhWhLls7cwesioqUGbq6")


// QR Code Constants
const WINDOW_TIME = 60;

const ID = "id";
const CODE = "hmac";

const VERIFICATION_KEYS = [ID, CODE];

module.exports = {
  TAGS,
  WINDOW_TIME,
  VERIFICATION_KEYS,
};
