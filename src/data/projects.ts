export interface Project {
  title: string;
  description: string;
  tags?: string[];
  repoUrl?: string;
  liveUrl?: string;
}

// TODO: add your projects here; the Projects page renders this list.
export const projects: Project[] = [];
