import { getResumeData } from "@/lib/resume";
import LanguagesManager from "@/components/admin/languages-manager";

export default async function LanguagesPage() {
  const data = await getResumeData();
  if (!data) return null;
  return <LanguagesManager initialData={data.languages} />;
}
