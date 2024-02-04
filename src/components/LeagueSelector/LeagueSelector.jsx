// LeagueSelector.jsx
import React from "react";

const LeagueSelector = ({ leagues, selectedLeague, onChange }) => {
  
  return (
    <select value={selectedLeague} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select a League</option>
      {leagues.map((league) => (
        <option key={league.id} value={league.id}>
          {league.name}
        </option>
      ))}
    </select>
  );
};

export default LeagueSelector;
