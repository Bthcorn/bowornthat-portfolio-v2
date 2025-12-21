import {
  Widget,
  WidgetHeader,
  WidgetTitle,
  WidgetContent,
  WidgetFooter,
} from "@/components/ui/widget";
import { Github, Star, Users, BookOpen, GitPullRequest, CircleDot, Calendar } from "lucide-react";
import Link from "next/link";

async function getGithubStats(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

async function getGithubActivity(username: string) {
  try {
    const [prs, issues] = await Promise.all([
      fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`, {
        next: { revalidate: 3600 },
      }).then((res) => res.json()),
      fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`, {
        next: { revalidate: 3600 },
      }).then((res) => res.json()),
    ]);

    return {
      prs: prs.total_count || 0,
      issues: issues.total_count || 0,
    };
  } catch (e) {
    return null;
  }
}

async function getGithubContributions(username: string) {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    
    // Sum up total contributions for the returned period (usually last year)
    const total = Object.values(data.total).reduce((a: any, b: any) => a + b, 0) as number;
    return { total };
  } catch (e) {
    return null;
  }
}

export async function GithubStats({ username }: { username: string }) {
  console.log(`Fetching stats for ${username}...`);
  
  const [stats, activity, contributions] = await Promise.all([
    getGithubStats(username),
    getGithubActivity(username),
    getGithubContributions(username),
  ]);

  if (!stats) {
    console.error("Failed to fetch GitHub stats");
    return (
      <div className="p-4 border rounded-lg bg-red-50 text-red-500">
        Failed to load GitHub Stats for {username}
      </div>
    );
  }

  console.log("Stats fetched successfully");

  return (
    <div className="grid grid-row-2 flex-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-4">
      {/* Profile Widget */}
      <Widget size="md" className="bg-white h-full md:h-auto md:row-span-2 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <WidgetHeader>
          <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <span className="font-semibold text-sm text-muted-foreground">GitHub Profile</span>
          </div>
        </WidgetHeader>
        
        <WidgetContent className="flex-col gap-1 items-start justify-center pl-2">
          <WidgetTitle className="text-2xl mb-4">@{stats.login}</WidgetTitle>
          <div className="flex gap-6 w-full">
              <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Repos</span>
                  <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-zinc-500" />
                      <span className="font-bold text-lg">{stats.public_repos}</span>
                  </div>
              </div>
              <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Followers</span>
                  <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-zinc-500" />
                      <span className="font-bold text-lg">{stats.followers}</span>
                  </div>
              </div>
              <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Following</span>
                  <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-zinc-500" />
                      <span className="font-bold text-lg">{stats.following}</span>
                  </div>
              </div>
          </div>
        </WidgetContent>

        <WidgetFooter>
          <Link 
              href={stats.html_url} 
              target="_blank" 
              className="text-xs text-muted-foreground hover:underline flex items-center gap-1"
          >
              View Profile ↗
          </Link>
          <div className="text-xs text-muted-foreground">
              Since {new Date(stats.created_at).getFullYear()}
          </div>
        </WidgetFooter>
      </Widget>

      {/* Activity Widget */}
      {activity && (
        <Widget size='sm' className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-auto py-4 px-2">
           <WidgetHeader className="pb-2">
            <div className="flex items-center gap-2">
                <GitPullRequest className="h-5 w-5" />
                <span className="font-semibold text-sm text-muted-foreground">Activity</span>
            </div>
          </WidgetHeader>
          <WidgetContent className="justify-start gap-8 px-2">
             <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total PRs</span>
                  <div className="flex items-center gap-2 mt-1">
                      <GitPullRequest className="h-4 w-4 text-green-500" />
                      <span className="font-bold text-xl">{activity.prs}</span>
                  </div>
              </div>
               <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Issues</span>
                  <div className="flex items-center gap-2 mt-1">
                      <CircleDot className="h-4 w-4 text-orange-500" />
                      <span className="font-bold text-xl">{activity.issues}</span>
                  </div>
              </div>
          </WidgetContent>
        </Widget>
      )}

      {/* Contribution Widget */}
      {contributions && (
        <Widget size="sm" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-auto py-4 px-2">
          <WidgetHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-semibold text-sm text-muted-foreground">Contributions</span>
            </div>
          </WidgetHeader>
          <WidgetContent className="justify-start px-2">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Last Year</span>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-xl">{contributions.total}</span>
              </div>
            </div>
          </WidgetContent>
        </Widget>
      )}
    </div>
  );
}
