import SocialsManager from "@/components/admin/socials-manager";
import { Separator } from "@/components/ui/separator";
import { getResumeData } from "@/lib/resume";
import { updatePersonalInfo } from "@/app/actions/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function PersonalPage() {
  const data = await getResumeData();
  if (!data) return null;

  async function handleSubmit(formData: FormData) {
      "use server";
      
      const newPersonalInfo = {
          ...data!.personalInfo,
          name: formData.get("name") as string,
          title: formData.get("title") as string,
          summary: formData.get("summary") as string,
          location: formData.get("location") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          avatarUrl: formData.get("avatarUrl") as string,
          initials: formData.get("initials") as string,
          resumeUrl: formData.get("resumeUrl") as string,
      };

      await updatePersonalInfo(newPersonalInfo);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
            <h3 className="text-lg font-medium">Personal Information</h3>
            <p className="text-sm text-muted-foreground">
            Update your contact details and professional summary.
            </p>
        </div>

        <form action={handleSubmit} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Name</label>
                <Input name="name" defaultValue={data.personalInfo.name} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Title</label>
                <Input name="title" defaultValue={data.personalInfo.title} />
            </div>
            <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium leading-none">Summary</label>
                <Textarea 
                name="summary" 
                defaultValue={data.personalInfo.summary} 
                className="min-h-[100px]"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Location</label>
                <Input name="location" defaultValue={data.personalInfo.location} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <Input name="email" defaultValue={data.personalInfo.email} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Phone</label>
                <Input name="phone" defaultValue={data.personalInfo.phone} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Avatar URL</label>
                <Input name="avatarUrl" defaultValue={data.personalInfo.avatarUrl} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Initials</label>
                <Input name="initials" defaultValue={data.personalInfo.initials} />
            </div>
            <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium leading-none">Resume URL (PDF Link)</label>
                <Input name="resumeUrl" defaultValue={data.personalInfo.resumeUrl || ""} placeholder="https://example.com/resume.pdf" />
            </div>
            </div>

            <Button type="submit">Save Changes</Button>
        </form>
      </div>

      <Separator />
      
      <SocialsManager initialData={data.personalInfo.socials} />
    </div>
  );
}
