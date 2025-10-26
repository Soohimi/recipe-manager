"use client";

import { useParams } from "next/navigation";
import { recipes } from "@/data/recipes";
import Link from "next/link";

export default function RecipePage() {
  const params = useParams();
  const recipeId = Number(params?.id);
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <main className="p-6 flex flex-col gap-4">
      <Link href="/" className="text-blue-500 hover:underline">
        ← Back
      </Link>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-[300px] object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {recipe.description}
      </p>
      <p className="p-2 rounded-lg text-sm inline-block text-gray-600 dark:text-gray-300">
        ⏰ {recipe.time}
      </p>
      <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mt-4">Instructions:</h3>
      <ol className="list-decimal list-inside mb-4">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </main>
  );
}
