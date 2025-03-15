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

### Features

-   feat(news): implement news management system
-   feat(news): create NewsController for handling news posts
-   feat(news): add NewsCategoryController for managing categories
-   feat(ui): develop RichTextEditor component for content creation
-   feat(news): implement category management with CRUD operations
-   feat(validation): add validation for news posts and categories
-   feat(ui): create responsive news listing and detail pages
-   feat(ui): add modern modal system for category management
-   feat(ui): implement confirmation dialogs for destructive actions
-   feat(ui): improve error handling and user feedback
-   feat(ui): ensure responsive design for all news components

### Performance

-   perf(db): optimize database queries for news retrieval

### Refactor

-   refactor(news): add relationship between news posts and categories

### Security

-   security(api): implement proper error handling for API requests
-   security(news): add security checks for category deletion
