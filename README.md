📖 Overview

This update transforms the Recipe Manager into a fully functional, client-side app where users can create, delete, and persist recipes — all without a backend.
Recipes remain available even after refreshing or navigating between pages.

🚀 Features

Add Recipes: Users can create custom recipes with title, ingredients, instructions, and image upload.

Persistent Storage: All recipes are saved to localStorage to ensure they stay after refresh.

Delete Functionality: Easily remove any recipe using a dropdown menu.

Dynamic Routing: Each recipe has its own detail page (/recipe/[id]).

Base Recipes Included: Default recipes are loaded from /data/recipes.ts on first load.

Modern UI: Styled with shadcn/ui components (Dialog, Button, DropdownMenu).

Responsive Layout: Works smoothly on desktop and mobile screens.

⚙️ Technical Details

Data Initialization:
On first load, recipes are fetched from /data/recipes.ts.
If localStorage already contains user-added recipes, those are merged automatically.

State Syncing:
The app keeps React state and localStorage synchronized using useEffect.

Image Upload:
Uploaded images are converted to Base64 strings using FileReader, allowing preview and storage without a backend.

Routing:
Implemented dynamic routes using [id] inside /recipe folder to handle individual recipe pages.

💡 Key Challenges Solved

Fixed issue where new recipes disappeared after navigation or refresh.

Prevented “Recipe not found” errors for dynamically added recipes.

Achieved full offline persistence without backend APIs.

🧩 Folder Structure
/app
├── page.tsx → Main page (list, add, delete)
├── /recipe/[id]/page.tsx → Individual recipe detail
/data
└── recipes.ts → Default static recipes
/components
├── theme-toggle.tsx → Theme toggle
└── ui/ → shadcn components (Dialog, Button, DropdownMenu)

👨🏻‍💻 Implementation Summary

Developer: Soheil
Main Tech: Next.js, React, TypeScript, shadcn/ui
Persistence: localStorage
Duration: ~2 days
