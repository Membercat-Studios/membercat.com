# Changelog

Changelog information for membercat.com. All changes from `0.0.1-Alpha+1` and above are listed below. Dates follow `YYYY-MM-DD` format.

## 0.1.0-Alpha+1 (2025-02-23)

-   Dropped `public_profile` column
-   Removed changing of profile privacy
-   Created moderator middleware
-   Separated admin and mod routes
-   Created Project and Team controllers for Modrinth API
-   Added caching to Modrinth API controllers

## 0.1.0-Alpha+2 (2025-02-XX)

-   Refactor Profiles
    -   Removed status settings
    -   Added custom profile photos (Gravatar support)
    -   New profile banner
    -   New tab designs
-   Stability updates to ProfileController
-   Rework of profile-based routes
-   Changed `Gravatar` component to generalized `Avatar` component
-   Update Navbar to support new profile photos
