import Greeting from "@/components/Greeting";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { delay } from "@/pages/api/async";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

export default async function Page() {
  const { projects } = await getData();
  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className="flex flex-col items-stretch justify-center min-h-[content] gap-5 py-4">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {
            projects.map((project) => (
              <div key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </div>
            ))
          }
        </div>
        <div className="w-full">
            <NewProject />
        </div>
        <div className="flex-2 grow w-full flex">
          <div className="w-full">
            <TaskCard title={"Task List"}/>
          </div>
        </div>
      </div>
    </div>
  );
}