"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemActions,
  ItemMedia,
} from "@/components/ui/item";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash, Plus, Icon, Globe } from "lucide-react";
import * as LucideIcons from "lucide-react";


interface SectionListProps<T> {
  title: string;
  items: T[];
  onSave: (items: T[]) => Promise<void>;
  renderItem: (item: T) => React.ReactNode;
  renderForm: (
    item: Partial<T>,
    onSave: (item: T) => void,
    onCancel: () => void
  ) => React.ReactNode;
  newItemTemplate: Partial<T>;
}

export function SectionList<T>({
  title,
  items,
  onSave,
  renderItem,
  renderForm,
  newItemTemplate,
}: SectionListProps<T>) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{
    item: Partial<T>;
    index: number;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon ? Icon : Globe; 
  };  

  const handleCreate = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: T, index: number) => {
    setEditingItem({ item: { ...item }, index });
    setIsDialogOpen(true);
  };

  const handleDelete = async (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    await onSave(newItems);
  };

  const handleSaveItem = async (savedItem: T) => {
    const newItems = [...items];
    if (editingItem !== null) {
      // Edit
      newItems[editingItem.index] = savedItem;
    } else {
      // Create
      newItems.push(savedItem);
    }
    await onSave(newItems);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {items.map((item, index) => (
          <Item key={index} variant="outline">
            {(item as any).icon && (
              <ItemMedia>
                {(() => {
                  const IconComponent = getIcon((item as any).icon);
                  return <IconComponent className="h-5 w-5 text-muted-foreground" />;
                })()}
              </ItemMedia>
            )}

            <ItemContent>
                {renderItem(item)}
            </ItemContent>
            
            <ItemActions>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(item, index)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(index)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </ItemActions>
          </Item>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>
          
          {/* Form Content */}
          <div className="py-4">
            {renderForm(
              editingItem ? editingItem.item : newItemTemplate,
              handleSaveItem,
              () => setIsDialogOpen(false)
            )}
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}
