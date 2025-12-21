"use client";

import { updateSection } from "@/app/actions/resume";
import { SectionList } from "@/components/admin/section-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Education } from "@/lib/resume";

function EducationForm({ item, onSave, onCancel }: { item: Partial<Education>; onSave: (item: Education) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Partial<Education>>(item || {});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSave = () => {
    onSave(formData as Education);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Degree</Label>
        <Input
          name="degree"
          value={formData.degree}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Institution</Label>
        <Input
          name="institution"
          value={formData.institution}
          onChange={handleChange}
        />
      </div>
      
       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label>Period</Label>
          <Input
              name="period"
              value={formData.period}
              onChange={handleChange}
          />
          </div>
           <div className="space-y-2">
          <Label>Extra Info (GPA etc.)</Label>
          <Input
              name="extra"
              value={formData.extra}
              onChange={handleChange}
          />
          </div>
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

export default function EducationManager({ initialData }: { initialData: Education[] }) {
  
  const handleSave = async (newItems: Education[]) => {
    await updateSection("education", newItems);
  };

  return (
    <SectionList
      title="Education"
      items={initialData}
      onSave={handleSave}
      newItemTemplate={{
        degree: "",
        institution: "",
        period: "",
        extra: "",
      }}
      renderItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{item.degree}</span>
          <span className="text-sm text-muted-foreground">
            {item.institution} | {item.period}
          </span>
        </div>
      )}
      renderForm={(item, onSave, onCancel) => (
        <EducationForm item={item} onSave={onSave} onCancel={onCancel} />
      )}
    />
  );
}
