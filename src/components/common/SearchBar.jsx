import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = ({
  value,
  onChange,
  onSearch,
  loading = false,
  placeholder = 'Enter Employee ID…',
  error,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) onSearch();
  };

  return (
    <div className="search-container">
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        error={!!error}
        helperText={error}
        aria-label="Employee ID search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ fontSize: 18, color: 'var(--color-text-tertiary)' }} />
            </InputAdornment>
          ),
        }}
        sx={{ flex: 1, maxWidth: 320 }}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        disabled={loading || !value.trim()}
        aria-label="Search employee"
        sx={{ height: 40, px: 3, flexShrink: 0 }}
      >
        {loading ? 'Searching…' : 'Search'}
      </Button>
    </div>
  );
};

export default SearchBar;
