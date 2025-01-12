"use client";

import { ProjectHome } from "@/app/[project]/ProjectHome";
import { RecipeBodySearch } from "@/components/RecipeBody/RecipeBodySearch";
import { useRecipeSessionStore } from "@/state/recipeSession";
import { Recipe, RecipeProject } from "@/types/databaseExtended";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProjectContainer({
  projectName,
  project,
  recipes,
}: {
  projectName: string;
  project: RecipeProject | null;
  recipes: Recipe[] | null;
}) {
  const currentSession = useRecipeSessionStore((state) => state.currentSession);
  const setCurrentSession = useRecipeSessionStore(
    (state) => state.setCurrentSession
  );
  const router = useRouter();
  const hasNoProject = project === null;

  useEffect(() => {
    if (hasNoProject) {
      setTimeout(() => router.push("/"), 3000);
    } else if (currentSession) {
      setCurrentSession(null);
    }
  }, []);

  return (
    <div
      className={classNames(
        "flex-1 flex flex-col",
        currentSession === null && "sm:px-6 sm:pb-6 sm:pt-4"
      )}
    >
      <RecipeBodySearch />
      {hasNoProject ? (
        <div className="flex items-center space-x-4 px-4">
          <span className="text-xl font-bold">
            No project {projectName}, redirecting back to home page.
          </span>
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <ProjectHome project={project} recipes={recipes || []} />
      )}
    </div>
  );
}
