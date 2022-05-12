export const firstBloodSound = new Audio("/sounds/kill-sounds/first_blood.mp3");
export const megaKillSound = new Audio("/sounds/kill-sounds/mega_kill.mp3");
export const monsterKillSound = new Audio(
  "/sounds/kill-sounds/monster_kill.mp3"
);
export const miauSound = new Audio("/sounds/kill-sounds/miau.m4a");

export function playSound(nr) {
  switch (nr) {
    // kill sounds
    case 2:
      megaKillSound.play();
      break;
    case 3:
      monsterKillSound.play();
      break;
    // other sounds
    case "miau":
      miauSound.play();
      break;
    case "firstBlood":
      firstBloodSound.play();
      break;
  }
}
