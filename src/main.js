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
const Player = k.add([k.circle(25), k.pos(300,435 ), k.color(k.BLACK), k.body({stickToPlatform: false}), k.area({friction: 0})])
Player.onKeyPress("space", () => {

	Player.jump()
})
k.add ([k.rect(290,20), k.pos(0,460), k.color(k.BLUE),

	k.body ({isStatic: true}),
	k.area({friction: 0}),
	k.move(k.LEFT, 300)
])


spawn()
k.loop(2, () => {
	spawn()
})

function spawn() {
	const rect = k.add([
        k.rect(290,20),
        k.pos(560 + k.rand(-100, 100), 460),
        k.color(k.BLUE),
        k.area(),
        k.body({ isStatic: true }),
        k.move(k.LEFT, 300),
    ])
}



export default k;
