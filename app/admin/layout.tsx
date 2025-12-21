import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminNav } from "@/components/admin/nav";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
      redirect("/login");
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col space-y-6 px-4 py-6 sm:px-8 sm:py-10 md:px-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Admin</h1>
          <p className="text-muted-foreground">
            Manage your resume data and content.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-sm text-sm text-muted-foreground">
            {session.user?.email}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </div>
      
      <Separator className="my-6" />

      {/* Content Layout */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
        <aside className="-mx-4 lg:mx-0 lg:w-1/5">
           <div className="lg:sticky lg:top-10">
            <AdminNav />
           </div>
        </aside>
        <div className="flex-1 lg:max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
