import { getResumeData } from "@/lib/resume";
import EducationManager from "@/components/admin/education-manager";

export default async function EducationPage() {
  const data = await getResumeData();
  if (!data) return null;
  return <EducationManager initialData={data.education} />;
}
