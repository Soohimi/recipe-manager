"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { recipes } from "@/data/recipes";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🍽 Recipe Manager</h1>
        <ThemeToggle />
      </div>

      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Your Recipe Manager</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Search your favorite recipes, discover new dishes, and enjoy cooking!
        </p>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-3 w-full max-w-md mx-auto block"
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {recipe.description}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-auto">
                  ⏰ {recipe.time}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
            No recipes found 😢
          </p>
        )}
      </section>
    </main>
  );
}
