# Changelog

Changelog information for membercat.com. All changes from `0.0.1-Alpha+1` and above are listed below. Dates follow `YYYY-MM-DD` format.

## 0.1.0-Alpha+1 (2025-02-23)

-   Dropped `public_profile` column
-   Removed changing of profile privacy
-   Created moderator middleware
-   Separated admin and mod routes
-   Created Project and Team controllers for Modrinth API
-   Added caching to Modrinth API controllers

## 0.1.0-Alpha+2 (2025-02-23)

-   Refactor Profiles
    -   Removed status settings
    -   Added custom profile photos (Gravatar support)
    -   New profile banner
    -   New tab designs
-   Stability updates to ProfileController
-   Rework of profile-based routes
-   Changed `Gravatar` component to generalized `Avatar` component
-   Update Navbar to support new profile photos

## 0.1.0-Alpha+3 (2025-02-26)

-   Added `top3Projects()` method to Projects Controller
-   Removed traditional email/password authentication (Discord and GitHub only)
-   Added social columns to users table
-   Improved social login flow
-   Completely removed profiles and all related routes and components.
-   Re-added `is_banned` column to users table
-   Removed `status` column from users table
-   Added `discord_id` and `discord_username` to admin users page. (In place of `Verified` column)
-   Removed ability to create new users and edit existing users from the admin panel.
-   Added `makeAdmin` method to User model
-   Replaced "Edit User" button with "Make Admin" button in admin users page. (Only visible to non-admin users.)

## 0.1.0-Alpha+4 (2025-02-28)

-   Refactored and optimized Modrinth API controllers
-   Routes for Modrinth API controllers
-   Added "Featured Projects" section to `Welcome.jsx` page
-   Refactored `top3Projects()` method
-   Created new `Search.jsx` component
-   Welcome page improvements

## 0.1.0-Alpha+5 (2025-03-05)

-   Added documentation functions
    -   DocsController handles markdown parsing and rendering
    -   DocsSidebar component shows all files in the `resources/docs` directory.
    -   DocsLayout component handles the layout of the documentation pages.

**THESE FEATURES ARE STILL VERY UNSTABLE AND WILL LIKELY CHANGE IN THE FUTURE**

## 0.2.0-Alpha+1 (2025-03-06)

-   Small Changes to SocialiteController
-   Rework of Documentation (by codingcat2468)
    -   Switched to `commonmark-highlight` for syntax highlighting. (composer)
    -   "Copy Code" button now works on codeblocks with > 2 lines.
    -   Files are now loaded recursively, to allow infinitely nested categories.
    -   Refactored DocsSidebar with recursive section loading
    -   The "docs" route can now accept infinite paths to sections/pages
    -   View the full changes [here](https://github.com/Membercat-Studios/membercat.com/pull/1)
-   Update Axios to 1.8.2 (pnpm)
-   Remove unused components
-   Fixed broken Discord links

**BREAKING CHANGES:**

-   Sections are now provided as "sectionData"
-   Access sections with "sectionData.sections" by path
-   Top-level sections are in "sectionData.this.subSections"
-   Sorting moved to client-side using "position" property

## 0.2.1-Alpha+1 (2025-03-07)

-   Removed `prismjs` and Typescript related dependencies. (pnpm)
-   Enhanced Search component
    -   Optimized performance with client-side filtering
    -   Reduced debounce time for faster response
    -   Improved UI with larger project icons
    -   Added project type badges
    -   Implemented caching to reduce API calls
    -   Added keyboard navigation support
-   Created comprehensive Projects page
    -   Modern UI with card-based layout
    -   Advanced filtering by project type and category
    -   Multiple sorting options (downloads, updated date, name)
    -   Slide-in filter panel with responsive design
    -   Active filter indicators with one-click removal
    -   Banner images from project galleries
    -   Animated transitions and hover effects
-   Backend improvements
    -   Added banner image support to ProjectController
    -   Implemented server-side filtering and sorting
    -   Optimized API responses with metadata
    -   Added caching for better performance

## 0.3.0-Alpha+1 (2025-03-15)

-   Implemented News Management System
    -   Created NewsController for handling news posts
    -   Added NewsCategoryController for managing news categories
    -   Developed RichTextEditor component for content creation
    -   Implemented category management with CRUD operations
    -   Added validation for news posts and categories
    -   Created responsive news listing and detail pages
-   UI/UX Improvements
    -   Modern modal system for category management
    -   Confirmation dialogs for destructive actions
    -   Improved error handling and user feedback
    -   Responsive design for all news components
-   Backend Enhancements
    -   Optimized database queries for news retrieval
    -   Added relationship between news posts and categories
    -   Implemented proper error handling for API requests
    -   Added security checks for category deletion

## 0.3.1-Alpha+1 (2025-03-20)

-   Fixed issues with "Make Admin" button on Admin User page.
-   Removed unused controllers and React components.
-   Added multiple utility pages (401, 403, 404, 500)
-   Created mock settings page for Admin Dashboard.
-   Admin dashboard now reflects proper user counts. (Other stats coming soon)
-   Refactored various components and routes.
-   Role middleware to improve access control.

## 0.3.1-Alpha+2 (2025-03-26)

-   Implemented recent activity tracking.
-   Navbar now shows active route/page.
-   Created mock page for Settings.
-   Small performance improvements.

## 0.3.1-Alpha+3 (2025-03-27)

-   Replaced scroll indicator on home page.
-   Blurred Github login (disabled for now)
-   Docs now temporarily disabled for non-admins.
