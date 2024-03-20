import React, { useState, useEffect } from 'react';
import TimelineService from '../TimelineService';

const Timeline = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    TimelineService.fetchEntries().then(response => {
      setEntries(response.data);
    });
  }, []);

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <p>{entry.description}</p>
          <p>{entry.due_date}</p>
          {/* Add buttons or links for editing and deleting here */}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
