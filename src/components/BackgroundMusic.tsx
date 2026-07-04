import { useEffect, useRef } from "react";
import { romanticContent } from "../config/content";
import { getYouTubeEmbedUrl } from "../utils/youtube";

const BACKGROUND_MUSIC_PLAYER_ID = "background-music-player";

export function BackgroundMusic() {
  const hasStartedRef = useRef(false);
  const musicUrl = getYouTubeEmbedUrl(romanticContent.backgroundMusicYoutubeUrl, {
    autoplay: true,
    controls: false,
    loop: true
  });

  useEffect(() => {
    function startMusic() {
      if (!musicUrl || hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;

      document
        .querySelectorAll(`#${BACKGROUND_MUSIC_PLAYER_ID}, .background-music-player`)
        .forEach((player) => player.remove());

      const player = document.createElement("iframe");
      player.id = BACKGROUND_MUSIC_PLAYER_ID;
      player.className = "background-music-player";
      player.title = "Background music";
      player.setAttribute("aria-hidden", "true");
      player.setAttribute("allow", "autoplay; encrypted-media");
      player.src = musicUrl;
      document.body.appendChild(player);

      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
    }

    window.addEventListener("pointerdown", startMusic, { once: true });
    window.addEventListener("keydown", startMusic, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
      document.getElementById(BACKGROUND_MUSIC_PLAYER_ID)?.remove();
      hasStartedRef.current = false;
    };
  }, [musicUrl]);

  return null;
}
