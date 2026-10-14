import { Button, Link, Typography } from "@mui/material";
import { projects } from "../../../data/projects.ts";
import { profile } from "../../../data/profile.ts";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle.ts";
import ChipElement from "../../atoms/Chip/ChipElement.tsx";
import { CardElement } from "../../atoms/Card/CardElement.tsx";

export default function ProjectsPage() {
  useDocumentTitle("Projects");

  return (
    <section className="rounded-2xl bg-glass p-6">
      <Typography variant="h4" component="h1" className="pb-4">
        Projects
      </Typography>

      {projects.length === 0 ? (
        <Typography>
          Projects are on the way. In the meantime, you can see my work on{" "}
          <Link href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
          .
        </Typography>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title}>
              <CardElement
                title={project.title}
                body={project.description}
                action={
                  project.repoUrl || project.liveUrl ? (
                    <Button
                      size="small"
                      href={project.liveUrl ?? project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.liveUrl ? "Live" : "Code"}
                    </Button>
                  ) : undefined
                }
              >
                {project.tags && (
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <ChipElement label={tag} />
                      </li>
                    ))}
                  </ul>
                )}
              </CardElement>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
