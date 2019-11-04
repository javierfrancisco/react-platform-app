import playlist from '../data/playlist.json';

import { react } from 'react-dom'
import React from 'react'

import './index.css'

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function. 
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body, 
    and a button to fetch the next post on a successful request.
*/

const postIds = [1,2,3,4,5,6,7,8]


function fetchPost (id) {
  return fetch('../data/playlist.json')
    .then((res) => res.json())
}


function TrackViewer() {
  const [index, setIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [post, setPost] = React.useState(null)

  console.log("playlist:" + playlist);

  React.useEffect(() => {
    setLoading(true)

    const post = {
      playlistName: playlist.name,
      title :       playlist.tracks.items[index].track.name,
      body :        playlist.tracks.items[index].track.name,
      imgSrc:       playlist.tracks.items[index].track.album.images[0].url
    };


    setPost(post)
    setError(null)
    setLoading(false)


  }, [index])

  const incrementIndex = () => {
    setIndex((i) => 
      i === postIds.length - 1
        ? i
        : i + 1
    )
  }

  if (loading === true) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    )
  }


  return (
    <div className="playlist-container">
      <div className="playlist-header">
        Playslist: {post.playlistName} 
      </div>
      <div className="track-hero">
        <img src={post.imgSrc} className="track-image"/>
      </div>
      <div className="track-info">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
      <div className="playlist-controller">
      controller
        {index === postIds.length - 1 
            ? <p>No more posts</p>
            : <button onClick={incrementIndex} className="playlist-button">
                Previous Post
              </button>
            }

        {index === postIds.length - 1 
            ? <p>No more posts</p>
            : <button onClick={incrementIndex} className="playlist-button">
                Next Post
              </button>
            }
      </div>
    </div>
  );
}




export default function PlaylistViewer () {


  return (
      <React.Fragment>
        <TrackViewer/>
      </React.Fragment>
    )
}