Github Tidy
============

This backbone powered webapp uses the Github API and metadata files stored in this repository to review the purpose and quality of repositories stored in our account---with the goal of better managing their multiduditity.

Reviewing Repositories
======================

Individual reviews for each repository are stored as `json` files in the `/reviews/` directory. Each repository should have a `.json` file that has the same name as the repo. For example, this repository, **github-tidy**, has a corresponding review file named `/reviews/github-tidy.json` ([link](https://github.com/codeforamerica/github-tidy/blob/gh-pages/reviews/github-tidy.json)).

These files are currently created manually by copying the `_default.json` review template and saving the file with the correct filename---i.e. the same name as the repo---in the `/reviews/` folder.

Once you have reviewed a repository, be sure to commit and push your files back to this Github repo.

See below for information on individual review criteria...

type
-------------

This is a super brief description of what the repository contains, e.g. "Rails app", "Wordpress Theme", "Gem", etc.  

Please try to be consistent to easily sort/filter i.e. don't label one "Rails app" and another "App of Rails".


readme_rating
-------------

To rate the quality of a repository's read me file, please assign it a rating of 0 (zero), 1, 2, 3, 4 or 5 according to the following criteria:

- &#10025;&#10025;&#10025;&#10025;&#10025; ("readme_rating": 0): The repository has no read me file whatsoever.

- &#10029;&#10025;&#10025;&#10025;&#10025; ("readme_rating": 1): The repository has a readme file---irrespective of its quality.

- &#10029;&#10029;&#10025;&#10025;&#10025; ("readme\_rating": 2): The readme file gives a basic description of what the repository contains, e.g. it is NOT only the default Rails template with no additional information

- &#10029;&#10029;&#10029;&#10025;&#10025; ("readme\_rating": 3): The readme file gives a _moderate_ description of the application, and how to configure and/or install it.

- &#10029;&#10029;&#10029;&#10029;&#10025; ("readme\_rating": 4): The readme file fully describes the repository, functionality, expected behavior and provides a _comprehensive_ description of configuration and installation requirements and procedures.

- &#10029;&#10029;&#10029;&#10029;&#10029; ("readme\_rating": 5): Above and beyond, this readme should be held up as a shining example for mere mortals to throw themselves upon its mercy; e.g. in addition to fulfilling the 4 star requirements, it contains screenshots, automated build tests, etc.

notes
-----

Leave comments that could be helpful for future reviewers or your own personal edification.

Backbone Boilerplate
====================

This boilerplate is the product of much research and frustration.  Existing
boilerplates freely modify Backbone core, lack a build process, and are very
prescriptive; Backbone Boilerplate changes that.

Organize your application in a logical filesystem, develop your
Models/Collections/Views/Routers inside modules, and build knowing you have
efficient code that will not bottleneck your users.

Thanks to our
[Contributors](https://github.com/tbranyen/backbone-boilerplate/contributors)!

Special Thanks to: [cowboy](http://github.com/cowboy),
[iros](http://github.com/iros), [nimbupani](http://github.com/nimbupani),
[wookiehangover](http://github.com/wookiehangover), and
[jugglinmike](http://github.com/jugglinmike) for helping me create this project.

## Documentation ##

View the Backbone Boilerplate documentation here:

[GitHub Wiki](https://github.com/tbranyen/backbone-boilerplate/wiki)

## Build process ##

To use the new and improved build process, please visit the 
[grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb)
plugin repo and follow the instructions to install.  Basing your project off
this repo will allow the `bbb` commands to work out-of-the-box.
