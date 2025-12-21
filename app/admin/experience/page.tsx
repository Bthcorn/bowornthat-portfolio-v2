import { getResumeData } from "@/lib/resume";
import ExperienceManager from "@/components/admin/experience-manager";

export default async function ExperiencePage() {
  const data = await getResumeData();
  if (!data) return null;
  return <ExperienceManager initialData={data.experience} />;
}
