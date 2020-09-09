// fix: dont load metadata
// fix: handle prompt cancellation gracefully
async function loadBin() {
  const binId = prompt("binId"); // todo later: ask and load by bin name and not id
  document.querySelector("#error").hidden = true;
  try {
    const binJson = await network.get(binId);
    console.log(`loaded bin: ${binId}`, binJson);
    document.querySelector("#view > textarea").value = JSON.stringify(binJson); // fix: make jsonString a two spaced indented json
    document.getElementById("metadata").innerText = binJson.metadata.id;
  } catch (error) {
    // todo later: move functionality to a dedicated function to handle and display and all user errors
    document.querySelector("#error").hidden = false;
    document.querySelector("#error").innerText = error;
    console.error(`error reading bin:`, error || "");
  }
}

async function newBin() {
  // todo later: confirm() wether to delete unsaved work
  const binName = prompt("bin name"); // todo later: replace prompt with querying an <input>
  const initialData = { hello: "world" };

  try {
    const binData = await network.post(binName, initialData);
    document.querySelector("#error").hidden = true;
    console.log(`Created bin ${binName} with data`, binData); // fix: display to the user the content of the json and metadata
    document.getElementById("metadata").innerText = binData.metadata.id;
  } catch (error) {
    document.querySelector("#error").hidden = false;
    document.querySelector("#error").innerText = error;
    console.error("error creating bin: ", error);
  }
}

async function saveBin() {
  const binId = document.getElementById("metadata").innerText;
  const binJson = document.querySelector("#view > textarea").value; // exercise: use "object destructuring with alias"

  try {
    const binData = JSON.parse(binJson);
    const res = await network.put(binId, binData);
    document.querySelector("#error").hidden = true;
    console.log(`Updated bin ${binId} with data`, res); // fix: display to the user the content of the json and metadata
  } catch (error) {
    document.querySelector("#error").hidden = false;
    document.querySelector("#error").innerText = error;
    console.error("error creating bin: ", error);
  }
}

async function deleteBin() {
  const binId = document.getElementById("metadata").innerText;

  try {
    const res = await network.delete(binId);
    document.querySelector("#error").hidden = true;
    console.log(`Deleted bin ${binId} with data`, res);
  } catch (error) {
    document.querySelector("#error").hidden = false;
    document.querySelector("#error").innerText = error;
    console.error("error deleting bin: ", error);
  }
}
