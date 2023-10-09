const fetch = require("node-fetch-commonjs");
const fs = require("fs");
const env = process.argv[2];

let fetchUrl = undefined;
let authToken = undefined;
let headers = {
  "Content-Type": "application/json"
};

require("dotenv").config({ path: "./.env.local" });

fetchUrl = process.env.API_CI_BUILD_URL;
// fetchUrl = "http://143.244.214.247/web/index.php/graphql"
authToken = process.env.CRAFT_GRAPHQL_AUTH_TOKEN;

if (!fetchUrl) {
  console.error("ERROR: fetch url cannot be undefined or an empty string");
  return;
}

if (fetchUrl.startsWith("$")) {
  const second = require("dotenv").config({ path: "./.env.local" });

  fetchUrl = second.parsed.API_CI_BUILD_URL;
  //authToken = second.parsed.CRAFT_GRAPHQL_AUTH_TOKEN;
}

/*if (authToken) {
  headers.Authorization = `Bearer ${authToken}`;
}*/

fetch
  .default(fetchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
    })
  })
  .then((result) => result.json())
  .then((result) => {
    const possibleTypes = {};
    const subTypes = [];
    const types = result.data.__schema.types;

    types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        subTypes.push(...supertype.possibleTypes.map((s) => s.name));
        possibleTypes[supertype.name] = supertype.possibleTypes.map(
          (subtype) => subtype.name
        );
      }
    });
    const subTypesSet = new Set(subTypes);
    const allTypes = Array.from(subTypesSet);

    fs.writeFile(
      "lib/apollo/possibleTypes.json",
      JSON.stringify(possibleTypes),
      (err) => {
        if (err) {
          console.error("Error writing possibleTypes.json", err);
        } else {
          console.log("lib/apollo/possibleTypes.json generated");
        }
      }
    );

    fs.writeFile(
      "lib/apollo/subTypes.json",
      JSON.stringify(allTypes),
      (err) => {
        if (err) {
          console.error("Error writing subTypes.json", err);
        } else {
          console.log("lib/apollo/subTypes.json generated");
        }
      }
    );
  })
  .catch((error) => {
    fs.writeFile("lib/apollo/possibleTypes.json", "", (err) => {
      if (err) {
        console.error("Error writing possibleTypes.json", err);
      } else {
        console.log("lib/apollo/possibleTypes.json generated");
      }
    });
    fs.writeFile("lib/apollo/subTypes.json", "", (err) => {
      if (err) {
        console.error("Error writing subTypes.json", err);
      } else {
        console.log("lib/apollo/subTypes.json generated");
      }
    });
    console.error("ERROR from generate types", error);
  });
