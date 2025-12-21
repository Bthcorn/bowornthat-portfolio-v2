'use server'

import { getResumeData, saveResumeData, ResumeData, PersonalInfo, Social } from "@/lib/resume";
import { revalidatePath } from "next/cache";

export async function updateSection<K extends keyof ResumeData>(section: K, data: ResumeData[K]) {
  const currentData = await getResumeData();
  
  if (!currentData) {
    throw new Error("Could not load resume data");
  }

  // Update the specific section
  currentData[section] = data;

  await saveResumeData(currentData);
  revalidatePath("/");
  revalidatePath(`/admin/${section}`);
  revalidatePath("/admin");
}

export async function updatePersonalInfo(data: PersonalInfo) {
  const currentData = await getResumeData();
  
  if (!currentData) {
    throw new Error("Could not load resume data");
  }

  currentData.personalInfo = data;

  await saveResumeData(currentData);
  revalidatePath("/");
  revalidatePath("/admin/personal");
  revalidatePath("/admin");
}

export async function updateSocials(socials: Social[]) {
  const currentData = await getResumeData();
  
  if (!currentData) {
    throw new Error("Could not load resume data");
  }

  currentData.personalInfo.socials = socials;

  await saveResumeData(currentData);
  revalidatePath("/");
  revalidatePath("/admin/personal");
}
