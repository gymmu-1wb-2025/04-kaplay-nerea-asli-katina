import kaplay from "kaplay";

const k = kaplay ({
	height: 480,
	width: 640,
	canvas: document.getElementById ("game-canvas"),
	background: "#5d9fd6",
	global: false,
	debug: true,
	debugKey: "r"
});
k.setGravity(1200);
const Player = k.add([k.circle(25), k.pos(300,435 ), k.body(), k.area()])
Player.onKeyPress("space", () => {

	Player.jump()
})
k.add ([k.rect(640,20), k.pos(0,460), k.color(k.BLUE),

	k.body ({isStatic: true}),
	k.area()
])
export default k;
