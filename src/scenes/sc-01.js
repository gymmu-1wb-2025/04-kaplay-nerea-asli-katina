import k from "../main";

export default function sc01() {
  k.setGravity(1200);
  const player = k.add([
  k.polygon([   //Mit Fobizz-Assistent generiert. Prompt: Erstelle eine   Herzfigur mit möglichst einfachem Code. Zweck: Ein Polygon ist eine Form aus mehreren Punkten, die verbunden werden.
    k.vec2(0, -10), // Jeder k.vec2 ist ein Punkt im 2D-Raum.
    k.vec2(-15, -25), // x = links/rechts, y = oben/unten
    k.vec2(-25, -15),
    k.vec2(-25, 0),
    k.vec2(0, 25),
    k.vec2(25, 0),
    k.vec2(25, -15),
    k.vec2(15, -25),
  ]),  // Die Punkte werden verbunden, oben entstehen zwei Rundungen, unten eine Spitze, das ergibt eine Herzform

  k.pos(300, 300),
  k.color(255, 80, 120),
  k.body({ stickToPlatform: false }),
  k.area(),
  "player",
]);

  player.onKeyPress("space", () => {
    player.jump();
  });

  k.add([
    k.rect(315, 20),
    k.pos(0, 300),
    k.color(255, 255, 255),
    k.body({ isStatic: true }),
    k.area({ friction: 0 }),
    k.move(k.LEFT, 300),
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
      k.move(k.LEFT, 300),
      "platform",
    ]);
  }

  let fertig = false;

  player.onUpdate(() => { //Mit Fobizz-Assistent generiert, Prompt: Wie kann man das Spiel stoppen, wenn der Spieler sich aus dem Bildschirm bewegt? Zweck: überprüft den Spieler ständig
    if (fertig) return;
    if (player.pos.y > k.height() || player.pos.y < 0) {  // > k.height() = unten rausgefallen, < 0 = oben rausgeflogen
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
      k.text("Level 2 erreicht\n\n Doppelklick auf Leertaste"),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color(255, 80, 120)
    ]);
    k.onKeyPress("space", () => {
      k.go("level-02");
    });
  });
}
