"use client";

import { updateSection } from "@/app/actions/resume";
import { SectionList } from "@/components/admin/section-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SkillCategory } from "@/lib/resume";

function SkillsForm({ item, onSave, onCancel }: { item: Partial<SkillCategory>; onSave: (item: SkillCategory) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Partial<SkillCategory>>(item || {});
  const [skillsText, setSkillsText] = useState(
    formData.skills ? formData.skills.join(", ") : ""
  );

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSave = () => {
    const skills = skillsText.split(",").map((s) => s.trim()).filter(Boolean);
    onSave({ ...formData, skills } as SkillCategory);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Category</Label>
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Frontend"
        />
      </div>

      <div className="space-y-2">
        <Label>Skills (Comma separated)</Label>
        <Input
          value={skillsText}
          onChange={(e) => setSkillsText(e.target.value)}
          placeholder="React, Vue, Angular"
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

export default function SkillsManager({ initialData }: { initialData: SkillCategory[] }) {
  
  const handleSave = async (newItems: SkillCategory[]) => {
    await updateSection("skills", newItems);
  };

  return (
    <SectionList
      title="Skills"
      items={initialData}
      onSave={handleSave}
      newItemTemplate={{
        category: "",
        skills: [],
      }}
      renderItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{item.category}</span>
          <div className="flex flex-wrap gap-1">
            {item.skills.map((skill: string, i: number) => (
                <span key={i} className="text-xs bg-secondary px-1 py-0.5 rounded">
                    {skill}
                </span>
            ))}
          </div>
        </div>
      )}
      renderForm={(item, onSave, onCancel) => (
        <SkillsForm item={item} onSave={onSave} onCancel={onCancel} />
      )}
    />
  );
}
