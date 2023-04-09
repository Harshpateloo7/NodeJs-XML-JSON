var cameras;

async function loadCameras() {
  if (cameras == undefined) {
    let response = await fetch(
      "http://localhost:8888/cameras.json",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    cameras = await response.json();
    console.log(cameras.Data[0].Name);
  }
  return cameras;
}

module.exports = {
  loadCameras
};