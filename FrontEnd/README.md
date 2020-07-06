# HouseFlix Front-End using ReactJS

This is a media server front-end built using ReactJS and use MediaServer API for fetching movie details and get stream contents.

## Setup Instructions

1.  Install NodeJs from [here](https://nodejs.org/en/download/).
2.  Install Yarn from [here](https://classic.yarnpkg.com/en/docs/install/#windows-stable).
3.  Open Terminal/cmd in this directory.
4.  Run `yarn add` 
5.  It will install all the dependencies.
6.  Run `yarn start` to start the development server at port `3000`.

Change the URL of the MediaServer at `src/shared/baseUrl.js`

## Building Optimized version

1.  Run `yarn build`
2.  `build` directory will be created with optimized deployable files
3. Use contents of `built` directory for deploying the front-end
