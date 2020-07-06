# Media Server with Video Streaming Service

Built using NodeJs and Express. Provide API endpoints for movie browse, search and video streaming services.

## Setup

1.  Install NodeJS from [here](https://nodejs.org/en/download/).
2.  Open Terminal/CMD in this directory.
3.  Install all the dependencies by running `npm install`
4. Start the server by `npm start`
5. By default, server will start at port `8000`

## Movie Lists

`list.json` contains the list of movies and TV Shows with appropriate fields. If new shows have to be added, add a new entry with relavant field in the list.json

## API End-Points

`BASE_URL` represents the IP address/domain of the hosted server with port. eg- `BASE_URL = http://192.168.1.23:8000/`

1.  Simple GET request at `BASE_URL/browse` returns list of all movies and tv shows in `list.json` after removing the `local_path` field in the entries (which refers to local path of the video files).
2.  GET request with parameter `q` at `BASE_URL/search?q=<query>` will return list of all movies and tv shows matching the `<query>`.
3.  GET request at `BASE_URL/movies/<movieId>` will stream the movie with `id`==`movieId`. `id` of each movie is given in `list.json` and thus will be return in each response to corresponding requests.