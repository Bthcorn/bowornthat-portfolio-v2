"use client";

import { updateSocials } from "@/app/actions/resume";
import { SectionList } from "@/components/admin/section-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { Globe } from "lucide-react";
import { Social } from "@/lib/resume";

function SocialsForm({ item, onSave, onCancel }: { item: Partial<Social>; onSave: (item: Social) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Partial<Social>>(item || {});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSave = () => {
    onSave(formData as Social);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Platform Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="GitHub"
        />
      </div>
      <div className="space-y-2">
        <Label>Icon (Lucide Icon Name)</Label>
        <Input
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          placeholder="Github"
        />
        <p className="text-xs text-muted-foreground">
          Case-sensitive name from Lucide React icons.
        </p>
      </div>
      <div className="space-y-2">
        <Label>URL</Label>
        <Input
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => handleFormSave()}>Save Item</Button>
      </div>
    </div>
  );
}

export default function SocialsManager({ initialData }: { initialData: Social[] }) {
  
  const handleSave = async (newItems: Social[]) => {
    await updateSocials(newItems);
  };

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon ? Icon : Globe; 
  };

  return (
    <div className="space-y-4">
        <div>
            <h3 className="text-lg font-medium">Social Links</h3>
            <p className="text-sm text-muted-foreground">
                Manage your social media profiles and links.
            </p>
        </div>
        <SectionList
        title="Socials"
        items={initialData}
        onSave={handleSave}
        newItemTemplate={{
            name: "",
            icon: "Globe",
            url: "",
        }}
        renderItem={(item) => (
            <div className="flex flex-col">
                <span className="font-semibold">{item.name}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                {item.url}
                </span>
            </div>
        )}
        renderForm={(item, onSave, onCancel) => (
            <SocialsForm item={item} onSave={onSave} onCancel={onCancel} />
        )}
        />
    </div>
  );
}
