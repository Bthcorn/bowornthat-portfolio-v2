import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access the admin dashboard.
          </p>
        </div>
        
        <div className="grid gap-6">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/admin" });
            }}
          >
            <Button className="w-full" variant="default" type="submit">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
