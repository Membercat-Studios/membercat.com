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
