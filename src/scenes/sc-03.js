import k from "../main";
export default function sc03() {

  k.setGravity(1200);

  const player = k.add([
    k.polygon([ //In Level 1 erklärt
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

  k.onKeyPress("space", () => {
    player.jump();
  });


  let score = 0;

  const timerText = k.add([
    k.text("Score: 0"),
    k.pos(20, 20),
    k.color(255, 80, 120),
  ]);

  timerText.onUpdate(() => {
    if (fertig) return; //In Level 1 erklärt
    score = score+1
    timerText.text = `Score: ${score}`;
  });


  function spawnBackgroundHeart() {
    const size = k.rand(5, 12);

    k.add([
      k.polygon([ //In Level 1 erklärt
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
      k.z(-1), //In Level 1 erklärt
      "bgHeart",
    ]);
  }
 k.loop(0.5, spawnBackgroundHeart);


  k.add([
    k.rect(315, 20),
    k.pos(0, 300),
    k.color(255, 255, 255),
    k.body({ isStatic: true }),
    k.area({ friction: 0 }),
    k.move(k.LEFT, 350),
    "platform",
  ]);

  function spawn() {
    k.add([
      k.rect(315, 20),
      k.pos(560 + k.rand(-100, 100), 300), //In Level 1 erklärt
      k.color(255, 255, 255),
      k.area(),
      k.body({ isStatic: true }),
      k.move(k.LEFT, 350),
      "platform",
    ]);
  }

  spawn();
  const spawnLoop = k.loop(1.75, spawn);

 const lava = k.add([
  k.rect(200, 20),
  k.pos(80, 300),
  k.color(255, 0, 0),
  k.area(),
  k.body({ isStatic: true }), //Mit Fobizz-Assistent generiert. Prompt: Wie könnte man ein Hinderniss hinzufügen, das den Spieler bei berührung zurück zum Start bringt? Zweck: Körper, der sich nicht bewegt
  "lava",
]);

  player.onCollide("lava", () => {  // Reagiert, wenn der Spieler die Lava berührt
    k.go("start"); // Wechselt zur Level 1 (Anfang)
  });


  let fertig = false; //In Level 1 erklärt

  player.onUpdate(() => {  //In Level 1 erklärt
    if (fertig) return;
    if (player.pos.y > k.height() || player.pos.y < 0) {
      gameOver();
    }
  });

  function gameOver() { //In Level 1 erklärt
    fertig = true;
    spawnLoop.cancel();
    k.destroyAll("platform");
    k.destroyAll("player");

    k.add([
      k.text("GAME OVER\nDrücke Enter"),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color(255, 80, 120),
      "gameOverText",
    ]);

    k.onKeyPress("enter", () => { //In Level 1 erklärt
      location.reload();
    });
  }


  k.wait(20, () => { //20 Sekunden warten"
    fertig = true;
    spawnLoop.cancel();
    k.destroyAll("platform");
    k.destroyAll("player");
    k.destroy(lava) //Lava Balken verschwindet, wenn man gewonnen hat.

    k.add([
      k.text("DU HAST GEWONNEN!"),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color(255, 80, 120),
    ]);

    k.onKeyPress("space", () => { //In Level 1 erklärt
      k.go("start");
    });
  });
}