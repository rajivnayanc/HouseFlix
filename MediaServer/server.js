const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
var cors = require('cors')
app.use(cors());
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.htm'))
})

app.get('/search', function(req, res) {
  const query = req.query.q;
  let rawData = fs.readFileSync('list.json');
  let lists = JSON.parse(rawData);
  var patt = new RegExp(`${query}`,"i");
  const movie_lists = lists.movies.filter((movie)=>patt.test(movie.title));
  const tvshow_lists = lists.tv_shows.filter((show)=>patt.test(show.title));
  output = []
  movie_lists.forEach((item,index)=>{
    output.push({
      id:item.id,
      title:item.title,
      poster:item.poster,
      year_of_release:item.year_of_release,
      duration:item.duration
    });
  });
  tvshow_lists.forEach((item,index)=>{
    output.push({
      id:item.id,
      title:item.title,
      poster:item.poster,
      year_of_release:item.year_of_release,
      duration:item.duration
    });
  });
  res.send(JSON.stringify(output));
})
app.get('/browse', function(req, res) {
  let rawData = fs.readFileSync('list.json');
  let lists = JSON.parse(rawData);
  let output = {
    movies:[],
    tv_shows:[]
  }
  lists.movies.forEach((item, index)=>{
    output.movies.push({
      id:item.id,
      title:item.title,
      poster:item.poster,
      year_of_release:item.year_of_release,
      duration:item.duration
    })
  });

  lists.tv_shows.forEach((item, index)=>{
    output.tv_shows.push({
      id:item.id,
      title:item.title,
      year_of_release:item.year_of_release,
      duration:item.duration
    })
  });
  res.send(JSON.stringify(output));
})

app.get('/movies/:movieId', function(req, res) {
  let path;
  let movieId = parseInt(req.params.movieId,10);
  let rawData = fs.readFileSync('list.json');
  let lists = JSON.parse(rawData);
  var movie = lists.movies.filter((mov)=>mov.id===movieId)[0];
  path = movie.local_path;
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }
    
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

app.listen(8000, function () {
  console.log('Listening on port 8000!')
})
