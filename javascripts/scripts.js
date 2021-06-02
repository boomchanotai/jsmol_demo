// Variable to collect the data from control panel and set the initial value
let displayed = true;
let atomsize = "20";
let bondsize = "15";
let showhydrogen = "TRUE";
let bgcolor = "white";
let rotation = "off";

// set Button

const setButton = () => {
  $("#controls_rotation").prop("checked", rotation == "on" ? true : false);
  $("#controls_displayhydrogen").prop(
    "checked",
    showhydrogen == "TRUE" ? true : false
  );
  $("#controls_atomsize").val(atomsize);
  $("#controls_bondsize").val(bondsize);
  $("#controls_bgcolor").val(bgcolor);
};

setButton();

// Control Panel
$("#controls_rotation").on("change", function () {
  rotation = this.checked ? "on" : "off";
  displayed ? Jmol.script(jmolApplet, "spin " + rotation) : null;
});

$("#controls_displayhydrogen").on("change", function () {
  showhydrogen = this.checked ? "TRUE" : "FALSE";
  displayed
    ? Jmol.script(jmolApplet, "set showHydrogens " + showhydrogen)
    : null;
});

$("#controls_atomsize").on("input", function () {
  atomsize = this.value;
  displayed ? Jmol.script(jmolApplet, "spacefill " + atomsize + "%") : null;
});

$("#controls_bondsize").on("input", function () {
  bondsize = this.value;
  displayed ? Jmol.script(jmolApplet, "wireframe 0." + bondsize) : null;
});

$("#controls_bgcolor").on("change", function () {
  bgcolor = this.value == "lightpink" ? "[xF8E1EA]" : this.value;
  Jmol.script(jmolApplet, "background " + bgcolor);
});

$("#controls_reset_atomsize").on("click", () => {
  atomsize = "20";
  displayed ? Jmol.script(jmolApplet, "spacefill " + atomsize + "%") : null;
  setButton();
});

$("#controls_reset_bondsize").on("click", () => {
  bondsize = "15";
  displayed ? Jmol.script(jmolApplet, "wireframe 0." + bondsize) : null;
  setButton();
});

displayed = true;
Jmol.script(
  jmolApplet,
  "load /assets/Conformer3D_CID_14202443.sdf; spin " +
    rotation +
    "; spacefill " +
    atomsize +
    "%; wireframe 0." +
    bondsize +
    "; set showHydrogens " +
    showhydrogen +
    ";"
);
