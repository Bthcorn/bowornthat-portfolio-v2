"use client";

import { updateSection } from "@/app/actions/resume";
import { SectionList } from "@/components/admin/section-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Language } from "@/lib/resume";

function LanguagesForm({ item, onSave, onCancel }: { item: Partial<Language>; onSave: (item: Language) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Partial<Language>>(item || {});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
   const handleNumberChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const handleFormSave = () => {
    onSave({
      ...formData,
      percentage: Number(formData.percentage)
    } as Language);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
          <Label>Language</Label>
          <Input
              name="lang"
              value={formData.lang}
              onChange={handleChange}
              placeholder="English"
          />
          </div>
           <div className="space-y-2">
          <Label>Level</Label>
          <Input
              name="level"
              value={formData.level}
              onChange={handleChange}
              placeholder="Native"
          />
          </div>
      </div>
      
      <div className="space-y-2">
        <Label>Proficiency % (0-100)</Label>
        <Input
          name="percentage"
          type="number"
          min="0"
          max="100"
          value={formData.percentage}
          onChange={handleNumberChange}
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

export default function LanguagesManager({ initialData }: { initialData: Language[] }) {
  
  const handleSave = async (newItems: Language[]) => {
    await updateSection("languages", newItems);
  };

  return (
    <SectionList
      title="Languages"
      items={initialData}
      onSave={handleSave}
      newItemTemplate={{
        lang: "",
        level: "",
        percentage: 0,
      }}
      renderItem={(item) => (
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{item.lang}</span>
          <span className="text-sm text-muted-foreground">
            {item.level} ({item.percentage}%)
          </span>
        </div>
      )}
      renderForm={(item, onSave, onCancel) => (
        <LanguagesForm item={item} onSave={onSave} onCancel={onCancel} />
      )}
    />
  );
}
