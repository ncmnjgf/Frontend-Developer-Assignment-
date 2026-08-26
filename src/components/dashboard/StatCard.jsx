import React from 'react';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

const StatCard = ({ icon, label, value, trend, trendLabel, color, bgColor }) => (
  <div className="stat-card" role="figure" aria-label={`${label}: ${value}`}>
    <div className="stat-card-bg" style={{ background: color }} />
    <div className="stat-card-icon" style={{ background: bgColor, color: color }}>
      {icon}
    </div>
    <div className="stat-card-value">{value}</div>
    <div className="stat-card-label">{label}</div>
    {trendLabel && (
      <div className={`stat-card-trend ${trend === 'up' ? 'up' : 'neutral'}`}>
        {trend === 'up' ? (
          <TrendingUpRoundedIcon sx={{ fontSize: 14 }} />
        ) : (
          <RemoveRoundedIcon sx={{ fontSize: 14 }} />
        )}
        {trendLabel}
      </div>
    )}
  </div>
);

export default StatCard;
