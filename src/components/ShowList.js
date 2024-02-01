// src/components/ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { removeHtmlTags } from './utils';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-light">Discover Premium TV Shows</h1>
      <div className="row">
        {shows.map(show => (
          <div key={show.show.id} className="col-lg-4 mb-4">
            <div className="card h-100 bg-dark text-light">
              <img
                src={show.show.image ? show.show.image.medium : 'placeholder-image-url'}
                className="card-img-top"
                alt={show.show.name}
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body">
                <h2 className="card-title">{show.show.name}</h2>
                <p className="card-text">{removeHtmlTags(show.show.summary)}</p>
                <p className="card-text">
                  <strong className="text-muted">Genres:</strong> {show.show.genres.join(', ')}
                </p>
                <p className="card-text">
                  <strong className="text-muted">Language:</strong> {show.show.language}
                </p>
                <Link to={`/show/${show.show.id}`} className="btn btn-warning">
                  Explore Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
