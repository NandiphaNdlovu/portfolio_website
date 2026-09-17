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
} from "@heroicons/react/24/outline";

import {
  DeleteOutline,
  Diversity1Outlined,
  Diversity2Outlined,
  GitHub,
  LinkedIn,
  FileDownloadOutlined,
  MenuOpenOutlined,
  MenuOutlined,
  Code,
  Psychology,
  Web,
  Storage,
  DataObject,
  BugReport,
  CloudUpload,
  Groups,
  School,
  AutoAwesome,
} from "@mui/icons-material";

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
