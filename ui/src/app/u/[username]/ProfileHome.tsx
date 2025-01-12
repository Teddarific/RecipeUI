"use client";

import {
  ShareInviteModal,
  TemplateMockCode,
} from "@/components/RecipeBody/RecipeTemplates";
import { DeepActionType, useRecipeSessionStore } from "@/state/recipeSession";
import {
  Recipe,
  RecipeProject,
  RecipeProjectStatus,
  User,
  UserTemplatePreview,
} from "@/types/databaseExtended";
import { getURLParamsForSession } from "@/utils/main";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function ProfileHome({
  profile,
  templates,
  projects,
}: {
  templates: UserTemplatePreview[];
  profile: Pick<User, "profile_pic" | "first" | "last" | "username">;
  projects: RecipeProject[];
}) {
  const router = useRouter();

  const [shareTemplate, setShareTemplate] =
    useState<UserTemplatePreview | null>(null);

  if (templates.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center space-x-2 justify-center">
        <h1 className="text-xl font-bold">
          @{profile.username} has nothing to show yet
        </h1>
        <button
          className="btn btn-accent btn-lg mt-2"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4">
      <div className="rounded-md ">
        <h2 className="font-bold text-3xl">{`@${profile.username}`}</h2>
      </div>
      <div className="mt-12">
        <h3 className="font-bold text-2xl mb-4">
          Recipes built in {projects.length} different APIs.
        </h3>
        <div className="flex flex-wrap space-x-4">
          {projects.map((projectInfo) => {
            return (
              <div
                className="flex justify-center flex-col items-center"
                key={projectInfo.id}
              >
                <img
                  className="object-cover w-[100px] h-[100px]"
                  // @ts-expect-error no
                  src={projectInfo.image}
                  alt={projectInfo.title}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold">
          Cookbook with {templates.length} recipes!
        </h2>
        <div className="projects-home-container">
          {templates.map((template) => {
            return (
              <div
                key={template.id}
                className="cursor-pointer h-full"
                onClick={() => {
                  setShareTemplate(template);
                }}
              >
                <TemplateMockCode key={template.id} template={template} />
              </div>
            );
          })}
        </div>
      </div>
      {shareTemplate && (
        <ShareInviteModal
          template={shareTemplate}
          onClose={() => {
            setShareTemplate(null);
          }}
        />
      )}
    </div>
  );
}

// function TemplateHomeBox({ template }: { template: UserTemplatePreview }) {
//   const router = useRouter();
//   const addSession = useRecipeSessionStore((state) => state.addSession);

//   return (
//     <div
//       className="border border-slate-700 rounded-md shadow-sm p-4 space-y-1 flex flex-col h-38 cursor-pointer"
//       onClick={() => {
//         // const session = addSession(recipe);
//         // router.push(`/?${getURLParamsForSession(session)}`);
//       }}
//     >
//       <div className="flex justify-between ">
//         <div className="flex items-center">
//           <h2 className="font-bold text-lg dark:text-gray-300">
//             {template.title}
//           </h2>
//         </div>

//         <button
//           className={classNames(
//             "btn btn-neutral btn-sm",
//             project.status === RecipeProjectStatus.Soon && "!btn-accent"
//           )}
//         >
//           Use
//         </button>
//       </div>

//       <p className="text-sm text-black line-clamp-3 dark:text-gray-300">
//         {recipe.summary}
//       </p>
//       {recipe.tags && recipe.tags.length > 0 && (
//         <>
//           <div className="flex-1" />
//           <div className="space-x-2">
//             {recipe.tags.map((tag) => {
//               return (
//                 <span
//                   className="badge badge-info p-2 py-3"
//                   key={recipe.id + tag}
//                 >
//                   {tag}
//                 </span>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
