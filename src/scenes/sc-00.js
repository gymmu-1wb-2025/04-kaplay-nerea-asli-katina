import k from "../main";
export default function sc00() {
 k.add([
   k.text("Level 1\n\nDoppelklick Leertaste"),
   k.pos(320, 240),
   k.anchor("center"),
   k.color(255, 80, 120)
 ]);
 k.onKeyPress("space", () => {
   k.go("level-01");
 });
}