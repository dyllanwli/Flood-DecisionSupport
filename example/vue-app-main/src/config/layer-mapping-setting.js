// This is an example file and is expected to be cloned 
// without the -example on the same folder that it resides.

// Defines the default zoom that must be applied when a certain
// object with a given layer is focused

const layerMappingSetting = {
  macrocounty: 3,
  country: 4,
  region: 7,
  county: 8,
  macroregion: 8,
  locality: 9,
  neighbourhood: 10,
  borough: 10,
  localadmin: 13,
  street: 14,
  address: 16,
  venue: 16,
  floodLevelColor: {
    aliceblue: "#F0F8FF",
    lightskyblue: "#87CEFA",
    dodgerblue: "#1E90FF",
    blue: "#0000FF",
    mediumblue: "#0000CD"
  }
}

export default layerMappingSetting
