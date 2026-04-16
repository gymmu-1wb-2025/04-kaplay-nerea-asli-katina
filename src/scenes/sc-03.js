import k from "../main";

export default function sc02() {

  k.setGravity(1200);
  const player = k.add([
  k.polygon([
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
    player.jump(300);
  });

  k.add([
    k.rect(315, 20),
    k.pos(0, 300),
    k.color(255, 255, 255),
    k.body({ isStatic: true }),
    k.area({ friction: 0 }),
    k.move(k.LEFT, 400),
    "platform",
  ]);
  k.add([
    k.rect (200, 20),
    k.pos (80, 300),
    k.color (255, 0, 0),
    k.area (),

    k.body ({ isStatic: true}),
    "lava",
  ]);
  player.onCollide ("lava", () => {
    k.go ("start");
  });


  spawn();
  const spawnLoop = k.loop(2, () => {
    spawn();
  });

  function spawn() {
    k.add([
      k.rect(315, 20),
      k.pos(560 + k.rand(-100, 100), 300),
      k.color(255, 255, 255),
      k.area(),
      k.body({ isStatic: true }),
      k.move(k.LEFT, 300),
      "platform",
    ]);
  }

  let fertig = false;

  player.onUpdate(() => {
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
      k.text("GAME OVER\n\ndrücke enter"),
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
      k.text(" Du hast gewonnen! \n Zum erneut spielen\n lade neu"),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color (255, 80, 120)
    ]);
    k.onKeyPress("space", () => {
      k.go("level-03");
    });
  });
}
