import { Link as RouterLink } from "react-router-dom";
import { Button, Link, Typography } from "@mui/material";
import { Icon } from "../../atoms/Icon/Icon.tsx";
import { IconSize, IconType } from "../../atoms/Icon/icon.ts";
import type { Unlock } from "../../../data/game.ts";

interface UnlockListProps {
  unlocks: Unlock[];
 
  unlockedLevel: number;
  wordsPerLevel: number;
}

function Reward({ unlock }: { unlock: Unlock }) {
  switch (unlock.kind) {
    case "download":
      return (
        <Button
          size="small"
          variant="contained"
          href={unlock.href}
          download={unlock.download}
        >
          {unlock.label}
        </Button>
      );
    case "internal":
      return (
        <Link component={RouterLink} to={unlock.href}>
          {unlock.label}
        </Link>
      );
    case "external":
      return (
        <Link href={unlock.href} target="_blank" rel="noopener noreferrer">
          {unlock.label}
        </Link>
      );
    default:
      return <Link href={unlock.href}>{unlock.label}</Link>;
  }
}

export function UnlockList({
  unlocks,
  unlockedLevel,
  wordsPerLevel,
}: UnlockListProps) {
  return (
    <ol className="flex flex-col gap-2">
      {unlocks.map((unlock, index) => {
        const level = index + 1;
        const unlocked = level <= unlockedLevel;

        return (
          <li
            key={unlock.id}
            className="flex items-center gap-3 rounded-xl bg-glass-faint p-3"
          >
            <span
              className={unlocked ? "text-accent-strong" : "text-gray-500"}
            >
              <Icon
                iconName={
                  unlocked
                    ? unlock.icon
                    : IconType.LockClosedIcon
                }
                size={IconSize.Md}
              />
            </span>
            <div className="min-w-0">
              <Typography variant="subtitle2" component="p">
                Level {level}
                {unlocked ? ` · ${unlock.title}` : ""}
              </Typography>
              {unlocked ? (
                <Typography variant="body2" component="div" className="break-words">
                  <Reward unlock={unlock} />
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Locked · collect {level * wordsPerLevel} words
                </Typography>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
