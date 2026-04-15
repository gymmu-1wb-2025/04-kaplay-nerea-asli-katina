import kaplay from "kaplay";
import sc00 from "./scenes/sc-00.js";
import sc01 from "./scenes/sc-01.js";
import sc02 from "./scenes/sc-02.js";
const k = kaplay({
 height: 480,
 width: 640,
 canvas: document.getElementById("game-canvas"),
 background: "#5d9fd6",
 global: false,
 debug: true,
 debugKey: "r",
});
k.scene("start", sc00);
k.scene("level-01", sc01);
k.scene ("level-02", sc02);
k.go("start");
export default k;