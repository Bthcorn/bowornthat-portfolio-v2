"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import { ResumeData } from "@/lib/resume";

// Pattern Separator Component
function PatternSeparator() {
  return (
    <div 
      className="w-full h-3 border-y bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" 
      style={{ 
        "--pattern-fg": "var(--pattern-color)",
        borderColor: "var(--pattern-color)",
      } as React.CSSProperties}
    />
  );
}

export function ResumeCard({ data, children, githubStats }: { data: ResumeData; children?: React.ReactNode; githubStats?: React.ReactNode }) {
  if (!data) return null;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Helper to get icon component dynamically
  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon ? Icon : Globe; 
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-background">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={item} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="w-24 h-24 md:w-28 md:h-28">
                <AvatarImage
                  src={data.personalInfo.avatarUrl}
                  alt="Profile"
                />
                <AvatarFallback>
                  {data.personalInfo.initials}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  {data.personalInfo.name}
                </h1>
                <p className="text-lg text-muted-foreground font-medium mt-1">
                  {data.personalInfo.title}
                </p>
              </div>

              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {data.personalInfo.summary}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{data.personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  <span>{data.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                {data.personalInfo.socials.map((social, index) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <Icon className="w-4 h-4" />
                        {social.name}
                      </a>
                    </Button>
                  );
                })}
                {data.personalInfo.resumeUrl ? (
                  <Button size="sm" className="gap-2" asChild>
                    <a href={data.personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </Button>
                ) : (
                  <Button size="sm" className="gap-2" disabled>
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                )}
              </div>

              {githubStats && (
                <div className="pt-4 w-full">
                  {githubStats}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <PatternSeparator />

        {/* Experience */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Experience
          </h2>

          <div className="space-y-8">
            {data.experience.map((job, index) => (
              <div key={index} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {job.role}
                    </h3>
                    <p className="font-medium">{job.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.location}
                    </p>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {job.period}
                  </Badge>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                {index < data.experience.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <PatternSeparator />

        {/* Projects */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Featured Projects
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span>{project.stars}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <PatternSeparator />

        {/* Skills */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">Skills</h2>

          <div className="space-y-5">
            {data.skills.map((group, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <PatternSeparator />

        {/* Education */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Education
          </h2>

          <div className="space-y-5">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
                {edu.extra && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    {edu.extra}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <PatternSeparator />

        {/* Languages */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Languages
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {data.languages.map((language, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">
                    {language.lang}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {language.level}
                  </span>
                </div>
                <div className="w-full bg-accent/20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${language.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="bg-accent h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Optional Children (e.g. Github Stats) */}
        {children && (
          <>
            <PatternSeparator />
            <motion.div variants={item} className="space-y-6">
              {children}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}

