import { ResumeCard } from "@/components/uitripled/resume-card-shadcnui";
import { getResumeData } from "@/lib/resume";

export default async function Home() {
  const data = await getResumeData();

  if (!data) return <div>Failed to load resume data</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full items-center justify-center">
        <ResumeCard data={data} />
      </main>
    </div>
  );
}
