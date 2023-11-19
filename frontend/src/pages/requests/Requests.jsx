import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import './request.css';
import RequestCard from '../../components/requestcard/RequestCard';

function Requests() {
  const { auth } = useAuthContext();
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (auth) {
          const response = await axios.get('http://localhost:5000/api/requests/', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setRequests(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequests();
  }, [auth]);

  console.log(requests);

  return (
    <div className="requests">
      <h3>Animal requests from users</h3>
      <div className="requests--container">
        {
            (requests) ? requests.map((request) => {
                return (
                    <RequestCard request={request} key={request._id} />
                )
            }) : (
                <h5>fetching</h5>
            )
        }
      </div>
    </div>
  );
}

export default Requests;