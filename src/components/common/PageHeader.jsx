import React from 'react';
import Button from '@mui/material/Button';

const PageHeader = ({ title, subtitle, action }) => (
  <div className="page-header">
    <div className="page-header-text">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export default PageHeader;
