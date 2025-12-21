"use client";

import { updateSection } from "@/app/actions/resume";
import { SectionList } from "@/components/admin/section-list";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/resume";

function ProjectsForm({ item, onSave, onCancel }: { item: Partial<Project>; onSave: (item: Project) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Partial<Project>>(item || {});
  const [techText, setTechText] = useState(
    formData.tech ? formData.tech.join(", ") : ""
  );

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSave = () => {
    const tech = techText.split(",").map((t) => t.trim()).filter(Boolean);
    onSave({ ...formData, tech } as Project);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Project Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Stars/Metric</Label>
          <Input
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            placeholder="2.5k"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Technologies (Comma separated)</Label>
        <Input
          value={techText}
          onChange={(e) => setTechText(e.target.value)}
          placeholder="React, Next.js, TypeScript"
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

export default function ProjectsManager({ initialData }: { initialData: Project[] }) {
  
  const handleSave = async (newItems: Project[]) => {
    await updateSection("projects", newItems);
  };

  return (
    <SectionList
      title="Projects"
      items={initialData}
      onSave={handleSave}
      newItemTemplate={{
        name: "",
        tech: [],
        desc: "",
        stars: "",
      }}
      renderItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{item.name}</span>
          <span className="text-sm text-muted-foreground">
            {item.desc}
          </span>
        </div>
      )}
      renderForm={(item, onSave, onCancel) => (
        <ProjectsForm item={item} onSave={onSave} onCancel={onCancel} />
      )}
    />
  );
}
