"use client";

import Link from "next/link";
import { useState } from "react";
import { recipes } from "@/data/recipes";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">🍽 Recipe Manager</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            You can search your recipe here and find delicious food to enjoy.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-3 w-full md:w-1/2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe, index) => (
          <Link
            key={recipe.id}
            href={`/recipe/${recipe.id}`}
            className={`group border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col bg-white dark:bg-gray-900 animate-fadeInUp`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {recipe.description}
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300 mt-auto">
                ⏰ {recipe.time}
              </div>
            </div>
          </Link>
        ))}

        {filteredRecipes.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 col-span-full">
            No recipes found for "{searchTerm}"
          </p>
        )}
      </div>
    </main>
  );
}
