# Pocket Calculator

### Installation

The app requires PHP 7, MySql, Composer and a web server. All requirements are met by
Homestead, the official Laravel Vagrant box.

To install, from the Homestead command line run the following:

``` composer install ``` to pull Laravel and all its dependencies.

``` cp .env.example .env ``` to create a configuration file from the given example. It must be modified with the proper database connection settings. If you use basic Homestead, the defaults should be fine too.

``` php artisan key:generate ``` to generate the secret key.

``` php artisan migrate:install ``` to create the necessary database tables.

The repository already includes the compiled css and js files, so it should not be necessary to use npm to pull in the frontend dependencies. If that's not the case:

``` npm install ```
``` npm run dev ```  or   ``` npm run production ```

### Implementation notes
The backend only manages authentication and two routes to GET and POST the backlogs.
Authentication is based on sessions and it's mostly implemented by Laravel authentication scaffolding facilities. The two JSON routes are used by the frontend to get and save backlogs via Ajax requests. There are two simple functional tests to check these routes, but should be checked a lot better. For example fail paths are not tested (nor implemented).

The calculator logic is managed by the frontend. The logic resides mostly in the Expression.js class, while all the other classes are React components that control interface events.

Sadly, the frontend is not covered by tests. Especially the Expression class should be unit tested exstensivly, but I did not have enough time and I choosed to work on other stuff.

### Known bugs
The search functionality shows a bug. If the user saves a backlog with a name to the server and then does a search, the backlog is resetted to an 'unnamed' state. That's because when the save action is completed, only the interface is updated with a name, but not the underlying backlogs array. So when the array is filtered (and unfiltered) for the search term, the backlogs list component is resetted with the original array data. From the backend point of view it's not a problem, since backlogs name or expressions are not unique, so the same backlog can be saved multiple time.



