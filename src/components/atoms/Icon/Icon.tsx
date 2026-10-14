import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  SparklesIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  NoSymbolIcon,
  HomeIcon,
  Square3Stack3DIcon,
  Cog6ToothIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  PuzzlePieceIcon,
  LockClosedIcon,
  LockOpenIcon,
  EnvelopeIcon,
  DocumentArrowDownIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// Imported by path so only the icons we use are pulled into the bundle.
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Diversity1Outlined from "@mui/icons-material/Diversity1Outlined";
import Diversity2Outlined from "@mui/icons-material/Diversity2Outlined";
import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import MenuOpenOutlined from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import Code from "@mui/icons-material/Code";
import Psychology from "@mui/icons-material/Psychology";
import Web from "@mui/icons-material/Web";
import Storage from "@mui/icons-material/Storage";
import DataObject from "@mui/icons-material/DataObject";
import BugReport from "@mui/icons-material/BugReport";
import CloudUpload from "@mui/icons-material/CloudUpload";
import Groups from "@mui/icons-material/Groups";
import School from "@mui/icons-material/School";
import AutoAwesome from "@mui/icons-material/AutoAwesome";

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  SVGProps,
  RefAttributes,
  FunctionComponent,
} from "react";

import type { SvgIconComponent } from "@mui/icons-material";

import classNames from "classnames";

import { IconSize, IconType, IconTypeMUI } from "./icon.ts";
type MuiIconType = SvgIconComponent;

type SvgType =
  | ForwardRefExoticComponent<
      PropsWithoutRef<SVGProps<SVGSVGElement>> & {
        title?: string;
        titleId?: string;
      } & RefAttributes<SVGSVGElement>
    >
  | FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;

export const HeroIcons: Record<IconType, SvgType> = {
  [IconType.Bars3Icon]: Bars3Icon,
  [IconType.BellIcon]: BellIcon,
  [IconType.XMarkIcon]: XMarkIcon,
  [IconType.PlusCircleIcon]: PlusCircleIcon,
  [IconType.TrashIcon]: TrashIcon,
  [IconType.PencilIcon]: PencilIcon,
  [IconType.SparklesIcon]: SparklesIcon,
  [IconType.InformationCircleIcon]: InformationCircleIcon,
  [IconType.ExclamationTriangleIcon]: ExclamationTriangleIcon,
  [IconType.ExclamationCircleIcon]: ExclamationCircleIcon,
  [IconType.CheckIcon]: CheckIcon,
  [IconType.ChevronDownIcon]: ChevronDownIcon,
  [IconType.ChevronDoubleLeftIcon]: ChevronDoubleLeftIcon,
  [IconType.ChevronDoubleRightIcon]: ChevronDoubleRightIcon,
  [IconType.NoSymbolIcon]: NoSymbolIcon,
  [IconType.HomeIcon]: HomeIcon,
  [IconType.Square3Stack3DIcon]: Square3Stack3DIcon,
  [IconType.Cog6ToothIcon]: Cog6ToothIcon,
  [IconType.PaperAirplaneIcon]: PaperAirplaneIcon,
  [IconType.UserCircleIcon]: UserCircleIcon,
  [IconType.PuzzlePieceIcon]: PuzzlePieceIcon,
  [IconType.LockClosedIcon]: LockClosedIcon,
  [IconType.LockOpenIcon]: LockOpenIcon,
  [IconType.EnvelopeIcon]: EnvelopeIcon,
  [IconType.DocumentArrowDownIcon]: DocumentArrowDownIcon,
  [IconType.PlayIcon]: PlayIcon,
  [IconType.PauseIcon]: PauseIcon,
  [IconType.ArrowPathIcon]: ArrowPathIcon,
  [IconType.ArrowUpIcon]: ArrowUpIcon,
  [IconType.ArrowDownIcon]: ArrowDownIcon,
  [IconType.ArrowLeftIcon]: ArrowLeftIcon,
  [IconType.ArrowRightIcon]: ArrowRightIcon,
};

export const MuiIcons: Record<IconTypeMUI, MuiIconType> = {
  [IconTypeMUI.DeleteIcon]: DeleteOutline,
  [IconTypeMUI.Diversity1Outlined]: Diversity1Outlined,
  [IconTypeMUI.Diversity2Outlined]: Diversity2Outlined,
  [IconTypeMUI.GitHub]: GitHub,
  [IconTypeMUI.LinkedIn]: LinkedIn,
  [IconTypeMUI.FileDownloadOutlined]: FileDownloadOutlined,
  [IconTypeMUI.MenuOutlined]: MenuOutlined,
  [IconTypeMUI.MenuOpenOutlined]: MenuOpenOutlined,
  [IconTypeMUI.Code]: Code,
  [IconTypeMUI.Psychology]: Psychology,
  [IconTypeMUI.Web]: Web,
  [IconTypeMUI.Storage]: Storage,
  [IconTypeMUI.DataObject]: DataObject,
  [IconTypeMUI.BugReport]: BugReport,
  [IconTypeMUI.CloudUpload]: CloudUpload,
  [IconTypeMUI.Groups]: Groups,
  [IconTypeMUI.School]: School,
  [IconTypeMUI.AutoAwesome]: AutoAwesome,
};

export interface IconProps {
  iconName: IconType | IconTypeMUI;
  className?: string;
  size?: IconSize;
  stroke?: string;
}

export function Icon({ iconName, className, size = IconSize.Xs }: IconProps) {
  const classes = classNames(size, className);

  if (iconName in HeroIcons) {
    const HeroIcon = HeroIcons[iconName as IconType];

    return <HeroIcon aria-hidden={true} className={classes} />;
  }

  if (iconName in MuiIcons) {
    const MuiIcon = MuiIcons[iconName as IconTypeMUI];

    return (
      <MuiIcon
        aria-hidden={true}
        className={classes}
        fontSize="inherit"
        sx={{
          width: "1em",
          height: "1em",
          display: "block",
          margin: 0,
        }}
      />
    );
  }

  return null;
}
