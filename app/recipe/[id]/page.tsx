"use client";

import { useParams } from "next/navigation";
import { recipes } from "@/data/recipes";
import Link from "next/link";
import Image from "next/image";

export default function RecipePage() {
  const params = useParams();
  const recipeId = Number(params?.id);
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) return <p className="p-6 text-red-500">Recipe not found</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        ← Back to recipes
      </Link>

      <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-md">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <section>
        <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {recipe.description}
        </p>
        <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300">
          ⏰ {recipe.time}
        </span>
      </section>

      <section>
        <h3 className="text-xl font-semibold mt-6 mb-2">🧂 Ingredients</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mt-6 mb-2">👨‍🍳 Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
