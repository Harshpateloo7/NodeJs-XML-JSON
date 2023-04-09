const express = require("express");
const path = require("path");

const parks = require("./components/parks/parks");
//const cameras = require("./components/cameras/cameras");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  //await cameras.loadCameras();
  let parksList = await parks.loadLocations();
  //console.log(parksList);
  response.render("index", { title: "Home", parks: parksList });
});
app.get("/park/:parkId", async (request, response) => {
  //console.log(request.params.parkId);
  let parkInfo = await parks.getParkById(request.params.parkId);
  response.render("park", { title: "Park", park: parkInfo });
});

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});