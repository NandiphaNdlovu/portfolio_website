import { useEffect } from "react";
import { profile } from "../data/profile.ts";

/** Sets the browser tab title for the current page. */
export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page
      ? `${page} | ${profile.name}`
      : `${profile.name} | ${profile.title}`;
  }, [page]);
}
