import { getResumeData } from "@/lib/resume";
import ProjectsManager from "@/components/admin/projects-manager";

export default async function ProjectsPage() {
  const data = await getResumeData();
  if (!data) return null;
  return <ProjectsManager initialData={data.projects} />;
}
