"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-800 dark:text-gray-200">
      <div>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          ← Back to recipes
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">📘 Project Overview</h2>
        <p>
          This Recipe Manager project was built as a simple and interactive web
          app using <strong>Next.js 14</strong> (App Router). It allows users to
          view, add, and manage recipes locally. Added recipes are stored in{" "}
          <strong>localStorage</strong> to remain available even after page
          refresh.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🧰 Technologies Used</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>⚡ Next.js 14 (App Router, Client Components)</li>
          <li>💅 Tailwind CSS for styling</li>
          <li>
            🧠 React Hooks (<code>useState</code>, <code>useEffect</code>)
          </li>
          <li>💾 localStorage for persistent data saving</li>
          <li>🖼️ Next/Image for optimized image rendering</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">⚙️ Technical Highlights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Recipes are first loaded from a static <code>data/recipes.ts</code>{" "}
            file, then dynamically extended with user-added recipes stored in
            localStorage.
          </li>
          <li>
            When a user adds a new recipe, it’s saved persistently and
            accessible from the homepage and its own dynamic route.
          </li>
          <li>
            The design is fully responsive and supports both light/dark mode via
            Tailwind.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🧩 Developer</h2>
        <p>
          Created by <strong>Soheil</strong> as part of a front-end task to
          demonstrate local data persistence, routing, and clean UI structure in
          Next.js.
        </p>
      </section>
    </main>
  );
}
