import k from "../main";

export default function sc02() {

  k.setGravity(1200);

  const player = k.add([
    k.circle(25),
    k.pos(300, 250),
    k.color(k.BLACK),
    k.body({ stickToPlatform: false }),
    k.area({ friction: 0 }),
    "player",
  ]);

  player.onKeyPress("space", () => {
    player.jump();
  });

  k.add([
    k.rect(270, 20),
    k.pos(0, 200),
    k.color(k.BLUE),
    k.body({ isStatic: true }),
    k.area({ friction: 0 }),
    k.move(k.LEFT, 500),
    "platform",
  ]);

  spawn();
  const spawnLoop = k.loop(2, () => {
    spawn();
  });

  function spawn() {
    k.add([
      k.rect(270, 20),
      k.pos(560 + k.rand(-100, 100), 250),
      k.color(k.BLUE),
      k.area(),
      k.body({ isStatic: true }),
      k.move(k.LEFT, 500),
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
      k.color(k.RED),
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
    ]);
    k.onKeyPress("space", () => {
      k.go("level-03");
    });
  });
}
