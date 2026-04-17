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

  let score = 0;
const timerText = k.add([
  k.text("Score: 0"),
  k.pos(20, 20),
  k.color(255, 80, 120),
]);

timerText.onUpdate(() => {
  if (fertig) return; // Wenn fertig gleich true ist, dann wird die Funktion beendet und somit der Score beendet.
  score = score+1 //Score wird um 1 erhäht
  timerText.text = `Score: ${score}` // Zeigt den neuen Score
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
    k.z(-1), // Mit Fobizz-Assistent generiert. Prompt: Wie kann man Objekte in den Hintergrund verschieben? Zweck: Objekt ist ganz hinten hinter Spieler & Plattformen
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
    k.move(k.LEFT, 300),
    "platform",
  ]);

  spawn();
  const spawnLoop = k.loop(1.5, () => { //Jede 1.5 Sekunden wird ein neues Objekt gespawnt.
    spawn();
  });

  function spawn() {
    k.add([
      k.rect(315, 20),
      k.pos(560 + k.rand(-100, 100), 300), //Dadurch werden Plattformen random gespawnt (Abstände)
      k.color(255, 255, 255),
      k.area(),
      k.body({ isStatic: true }),
      k.move(k.LEFT, 300),
      "platform",
    ]);
  }

  let fertig = false; //Wenn nicht fertig, läuft noch

  player.onUpdate(() => { //Mit Fobizz-Assistent generiert, Prompt: Wie kann man das Spiel stoppen, wenn der Spieler sich aus dem Bildschirm bewegt? Zweck: überprüft den Spieler ständig
    if (fertig) return;
    if (player.pos.y > k.height() || player.pos.y < 0) {  // > k.height() = unten rausgefallen, < 0 = oben rausgeflogen
      gameOver();
    }
  });

  function gameOver() {
    fertig = true;  //Wenn  Spiel fertig, Gameover/Level geschafft
    spawnLoop.cancel(); //Stoppt spawnen von neuen Plattformen
    k.destroyAll("platform"); //Löscht alle Plattformen
    k.destroyAll("player"); //Löscht den Spieler
    k.add([
      k.text("GAME OVER\n\ndrücke Enter"),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color(255, 80, 120),
      "gameOverText",
    ]);
    k.onKeyPress("enter", () => { //Wartet, bis Enter gedrückt wird
      k.destroyAll("gameOverText"); //Löscht den Gameover text
      location.reload(); //Spiel startet neu (von Anfang)
    });
  }

 k.wait(30, () => { //30 Sekunden warten
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
    k.onKeyPress("space", () => { //Wartet, das Leertaste gedrückt wird.
      k.go("level-02"); //Startet level 2
    });
  });
}
