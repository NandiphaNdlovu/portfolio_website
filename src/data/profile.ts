import cvUrl from "../assets/data/Nandipha_Ndlovu_CV-2025.pdf";
import { IconType, IconTypeMUI } from "../components/atoms/Icon/icon.ts";

export const profile = {
  name: "Nandipha Ndlovu",
  title: "Software Developer",
  summary: `Software development professional with a track record of producing reliable code and
contributing to project success. Known for collaborative teamwork and a result-driven approach
in dynamic environments. Skilled in several programming languages and adept at communicating
technical concepts.`,
  github: "https://github.com/NandiphaNdlovu",
  // TODO: add your LinkedIn profile URL and contact email. Links left empty are hidden.
  linkedin: "",
  email: "",
};

export interface ProfileLink {
  label: string;
  icon: IconType | IconTypeMUI;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  /** Downloads the file instead of navigating. */
  download?: string;
}

/** Social/contact links shown in the navbar. Entries without an href are dropped. */
export const profileLinks: ProfileLink[] = [
  {
    label: "GitHub",
    icon: IconTypeMUI.GitHub,
    href: profile.github,
    external: true,
  },
  {
    label: "LinkedIn",
    icon: IconTypeMUI.LinkedIn,
    href: profile.linkedin,
    external: true,
  },
  {
    label: "Download CV",
    icon: IconTypeMUI.FileDownloadOutlined,
    href: cvUrl,
    download: "Nandipha_Ndlovu_CV.pdf",
  },
].filter((link) => link.href);

export const contactLink: ProfileLink | undefined = profile.email
  ? {
      label: "Let's Talk",
      icon: IconType.PaperAirplaneIcon,
      href: `mailto:${profile.email}`,
    }
  : undefined;
