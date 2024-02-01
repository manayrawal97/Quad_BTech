// src/components/ShowSummary.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { removeHtmlTags } from './utils';

const ShowSummary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    numberOfTickets: 1,
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShow(data));
  }, [id]);

  const handleBookTicket = () => {
    setShowBookingForm(true);
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission (e.g., API call, etc.)
    alert(`Booking confirmed for ${show.name}!`);
    setShowBookingForm(false);
  };

  return (
    <div className="container-fluid bg-dark text-light py-5">
      <div className="container">
        {show && (
          <div className="card bg-secondary text-light">
            <img
              src={show.image ? show.image.medium : 'placeholder-image-url'}
              className="card-img-top"
              alt={show.name}
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', margin: 'auto' }}
            />
            <div className="card-body text-center">
              <h2 className="card-title">{show.name}</h2>

              {/* Additional Information */}
              <p>
                <strong>Language:</strong> {show.language}
              </p>
              <p>
                <strong>Runtime:</strong> {show.runtime} minutes
              </p>
              <p>
                <strong>Genres:</strong> {show.genres.join(', ')}
              </p>
              <p>
                <strong>Schedule:</strong> {show.schedule.days.join(', ')} at {show.schedule.time}
              </p>

              {/* Summary */}
              <strong>Summary:</strong>
              <p className="card-text">{removeHtmlTags(show.summary)}</p>

              {/* Booking Button */}
              <button className="btn btn-success text-dark" onClick={handleBookTicket}>
                Book Movie Ticket
              </button>
            </div>
          </div>
        )}

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Book Movie Ticket - {show.name}</h5>
                  <button type="button" className="close" onClick={handleCloseForm} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Booking Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name" className="text-dark">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="text-dark">Your Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={bookingDetails.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="numberOfTickets" className="text-dark">Number of Tickets</label>
                      <input
                        type="number"
                        className="form-control"
                        id="numberOfTickets"
                        name="numberOfTickets"
                        value={bookingDetails.numberOfTickets}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </div>
                    {/* Add more relevant details as needed */}
                    <button type="submit" className="btn btn-primary">
                      Confirm Booking
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSummary;
