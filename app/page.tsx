"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { recipes as baseRecipes } from "@/data/recipes";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  description: string;
  time: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeFormState {
  id?: number;
  title?: string;
  description?: string;
  time?: string;
  image?: string;
  ingredients?: string;
  instructions?: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [newRecipe, setNewRecipe] = useState<RecipeFormState>({});

  useEffect(() => {
    const saved = localStorage.getItem("recipes");
    if (saved) {
      setRecipes(JSON.parse(saved));
    } else {
      setRecipes(baseRecipes);
      localStorage.setItem("recipes", JSON.stringify(baseRecipes));
    }
  }, []);

  useEffect(() => {
    if (recipes.length > 0)
      localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddDialog = () => {
    setEditingRecipe(null);
    setNewRecipe({});
    setOpenDialog(true);
  };

  const openEditDialog = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe({
      ...recipe,
      ingredients: recipe.ingredients.join("\n"),
      instructions: recipe.instructions.join("\n"),
    });
    setOpenDialog(true);
  };

  const handleSaveRecipe = () => {
    if (!newRecipe.title || !newRecipe.description || !newRecipe.time) return;

    const toArray = (str?: string) =>
      str?.split("\n").filter((s) => s.trim()) || [];

    if (editingRecipe) {
      setRecipes((prev) =>
        prev.map((r) =>
          r.id === editingRecipe.id
            ? {
                ...r,
                title: newRecipe.title!,
                description: newRecipe.description!,
                time: newRecipe.time!,
                image: newRecipe.image || r.image,
                ingredients: toArray(newRecipe.ingredients),
                instructions: toArray(newRecipe.instructions),
              }
            : r
        )
      );
    } else {
      const id = recipes.length ? Math.max(...recipes.map((r) => r.id)) + 1 : 1;
      setRecipes((prev) => [
        ...prev,
        {
          id,
          title: newRecipe.title!,
          description: newRecipe.description!,
          time: newRecipe.time!,
          image: newRecipe.image || "",
          ingredients: toArray(newRecipe.ingredients),
          instructions: toArray(newRecipe.instructions),
        },
      ]);
    }

    setOpenDialog(false);
  };

  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🍽 Recipe Manager</h1>
        <ThemeToggle />
      </div>

      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Your Recipe Manager</h2>
        <Input
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto block"
        />
      </section>

      <div className="flex justify-center">
        <Button onClick={openAddDialog}>Add New Recipe</Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingRecipe ? "Edit Recipe" : "Add Recipe"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Title"
              value={newRecipe.title || ""}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, title: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={newRecipe.description || ""}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, description: e.target.value })
              }
            />
            <Input
              placeholder="Time"
              value={newRecipe.time || ""}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, time: e.target.value })
              }
            />
            <Textarea
              placeholder="Ingredients (one per line)"
              value={newRecipe.ingredients || ""}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, ingredients: e.target.value })
              }
            />
            <Textarea
              placeholder="Instructions (one per line)"
              value={newRecipe.instructions || ""}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, instructions: e.target.value })
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () =>
                  setNewRecipe({
                    ...newRecipe,
                    image: reader.result as string,
                  });
                reader.readAsDataURL(file);
              }}
            />
            <Button onClick={handleSaveRecipe} className="mt-2">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              <Link
                href={`/recipe/${recipe.id}`}
                className="relative w-full h-48"
              >
                {recipe.image && (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </Link>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-start">
                  <Link
                    href={`/recipe/${recipe.id}`}
                    className="text-lg font-semibold mb-2 hover:underline"
                  >
                    {recipe.title}
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="p-0">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(recipe)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(recipe.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {recipe.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-auto">
                  ⏰ {recipe.time}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No recipes found 😢
          </p>
        )}
      </section>
    </main>
  );
}
