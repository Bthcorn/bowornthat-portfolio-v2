import { getResumeData } from "@/lib/resume";
import SkillsManager from "@/components/admin/skills-manager";

export default async function SkillsPage() {
  const data = await getResumeData();
  if (!data) return null;
  return <SkillsManager initialData={data.skills} />;
}
