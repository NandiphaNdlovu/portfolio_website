import { ReactNode } from "react";
import { Button } from "@mui/material";
import { Icon } from "../../atoms/Icon/Icon.tsx";
import { IconSize, IconType } from "../../atoms/Icon/icon.ts";
import type { GameStatus } from "../../pages/GamePage/wordDeck.ts";

interface GameControlsProps {
  status: GameStatus;
  onStart: () => void;
  onPause: () => void;
  children?: ReactNode;
}

/* start / pause / resume / restart */
export function GameControls({
  status,
  onStart,
  onPause,
  children,
}: GameControlsProps) {
  const startLabel =
    status === "paused" ? "Resume" : status === "ready" ? "Start" : "Restart";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {status === "running" ? (
        <>
          {children}
          <Button
            variant="outlined"
            onClick={onPause}
            startIcon={<Icon iconName={IconType.PauseIcon} size={IconSize.Sm} />}
          >
            Pause
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={onStart}
          startIcon={
            <Icon
              iconName={
                startLabel === "Restart"
                  ? IconType.ArrowPathIcon
                  : IconType.PlayIcon
              }
              size={IconSize.Sm}
            />
          }
        >
          {startLabel}
        </Button>
      )}
    </div>
  );
}
