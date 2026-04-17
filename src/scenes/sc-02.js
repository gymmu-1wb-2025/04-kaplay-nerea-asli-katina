import k from "../main";

export default function sc02() {

  k.setGravity(1200);
  const player = k.add([
  k.polygon([  //Gleich wie bei Level 1
    k.vec2(0, -10),
    k.vec2(-15, -25),
    k.vec2(-25, -15),
    k.vec2(-25, 0),
    k.vec2(0, 25),
    k.vec2(25, 0),
    k.vec2(25, -15),
    k.vec2(15, -25),
  ]),

  k.pos(300, 300),
  k.color(255, 80, 120),
  k.body({ stickToPlatform: false }),
  k.area(),
  "player",
]);

  player.onKeyPress("space", () => {
    player.jump();
  });
  let score = 0;
const timerText = k.add([
  k.text("Score: 0"),
  k.pos(20, 20),
  k.color(255, 80, 120),
]);

timerText.onUpdate(() => {
  score = score+1
  timerText.text = `Score: ${score}`
})

 function spawnBackgroundHeart() {
  const size = k.rand(5, 12); // zufällige Größe

  k.add([
    k.polygon([ //Wie unser Spielobjekt (Herz)
      k.vec2(0, -5),
      k.vec2(-7, -12),
      k.vec2(-12, -5),
      k.vec2(-12, 0),
      k.vec2(0, 10),
      k.vec2(12, 0),
      k.vec2(12, -5),
      k.vec2(7, -12),
    ]),
    k.pos(k.rand(0, k.width()), k.rand(0, k.height())),
    k.scale(size / 10),
    k.color(255, 150, 180),
    k.move(k.LEFT, k.rand(20, 60)),
    k.z(-1), // Wie in Level 1
    "bgHeart",
  ]);
}
k.loop(0.5, () => {
  spawnBackgroundHeart();
});


  k.add([
    k.rect(315, 20),
    k.pos(0, 300),
    k.color(255, 255, 255),
    k.body({ isStatic: true }),
    k.area({ friction: 0 }),
    k.move(k.LEFT, 450),
    "platform",
  ]);

  spawn();
  const spawnLoop = k.loop(1.5, () => {
    spawn();
  });

  function spawn() {
    k.add([
      k.rect(315, 20),
      k.pos(560 + k.rand(-100, 100), 300),
      k.color(255, 255, 255),
      k.area(),
      k.body({ isStatic: true }),
      k.move(k.LEFT, 450),
      "platform",
    ]);
  }

  let fertig = false;

  player.onUpdate(() => {  //Gleich wie bei Level 1
    if (fertig) return;
    if (player.pos.y > k.height() || player.pos.y < 0) {
      gameOver();
    }
  });

  function gameOver() {
    fertig = true;
    spawnLoop.cancel();
    k.destroyAll("platform");
    k.destroyAll("player");
    k.add([
      k.text("GAME OVER\n\ndrücke Enter"),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color(255, 80, 120),
      "gameOverText",
    ]);
    k.onKeyPress("enter", () => {
      k.destroyAll("gameOverText");
      location.reload();
    });
  }

  k.wait(30, () => {
    fertig = true;
    spawnLoop.cancel();
    k.destroyAll("platform");
    k.destroyAll("player");
    k.add([
      k.text("Level 3 erreicht\n\nDoppelklick auf Leertaste"),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color (255, 80, 120)
    ]);
    k.onKeyPress("space", () => {
      k.go("level-03");
    });
  });
}
