"use client";

import { updateSection } from "@/app/actions/resume";
import { SectionList } from "@/components/admin/section-list";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Experience } from "@/lib/resume";

function ExperienceForm({ item, onSave, onCancel }: { item: Partial<Experience>; onSave: (item: Experience) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Partial<Experience>>(item || {});
  const [achievementsText, setAchievementsText] = useState(
    formData.achievements ? formData.achievements.join("\n") : ""
  );

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSave = () => {
    const achievements = achievementsText
      .split("\n")
      .filter((line: string) => line.trim() !== "");
      
    // Basic validation or safety check can be added here
    onSave({ ...formData, achievements } as Experience);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Role</Label>
        <Input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Senior Developer"
        />
      </div>
      <div className="space-y-2">
        <Label>Company</Label>
        <Input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Tech Corp"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Period</Label>
          <Input
            name="period"
            value={formData.period}
            onChange={handleChange}
            placeholder="2020 - Present"
          />
        </div>
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Remote"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Achievements (One per line)</Label>
        <Textarea
          className="min-h-[150px]"
          value={achievementsText}
          onChange={(e) => setAchievementsText(e.target.value)}
          placeholder="- Built a cool feature..."
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleFormSave}>Save Item</Button>
      </div>
    </div>
  );
}

export default function ExperienceManager({ initialData }: { initialData: Experience[] }) {
  
  const handleSave = async (newItems: Experience[]) => {
    await updateSection("experience", newItems);
  };

  return (
    <SectionList
      title="Experience"
      items={initialData}
      onSave={handleSave}
      newItemTemplate={{
        role: "",
        company: "",
        period: "",
        location: "",
        achievements: [],
      }}
      renderItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{item.role}</span>
          <span className="text-sm text-muted-foreground">
            {item.company} | {item.period}
          </span>
        </div>
      )}
      renderForm={(item, onSave, onCancel) => (
        <ExperienceForm item={item} onSave={onSave} onCancel={onCancel} />
      )}
    />
  );
}
