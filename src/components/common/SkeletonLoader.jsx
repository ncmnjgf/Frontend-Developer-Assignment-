import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const TableSkeletonLoader = ({ rows = 5 }) => (
  <Box>
    {/* Header */}
    <Box sx={{ display: 'flex', gap: 2, px: 2, py: 1.5, borderBottom: '1px solid var(--color-border)' }}>
      {[30, 200, 160, 120, 100, 100].map((w, i) => (
        <Skeleton key={i} variant="rounded" width={w} height={16} sx={{ flexShrink: 0 }} />
      ))}
    </Box>
    {Array.from({ length: rows }).map((_, i) => (
      <Box
        key={i}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
          py: 1.8,
          borderBottom: '1px solid var(--color-border-light)',
        }}
      >
        <Skeleton variant="circular" width={36} height={36} sx={{ flexShrink: 0 }} />
        <Skeleton variant="rounded" width={160} height={16} />
        <Skeleton variant="rounded" width={200} height={16} sx={{ ml: 'auto' }} />
        <Skeleton variant="rounded" width={120} height={16} />
        <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 99 }} />
        <Skeleton variant="rounded" width={90} height={32} />
      </Box>
    ))}
  </Box>
);

export const CardSkeletonLoader = ({ count = 3 }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <Box key={i} sx={{ p: 3, border: '1px solid var(--color-border-light)', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rounded" width="70%" height={16} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width="50%" height={14} />
          </Box>
        </Box>
        <Skeleton variant="rounded" width="100%" height={14} sx={{ mb: 1 }} />
        <Skeleton variant="rounded" width="80%" height={14} />
      </Box>
    ))}
  </Box>
);

export const StatCardSkeletonLoader = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
    {[0, 1, 2].map((i) => (
      <Box key={i} sx={{ p: 3, border: '1px solid var(--color-border-light)', borderRadius: 3 }}>
        <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: 2, mb: 2 }} />
        <Skeleton variant="rounded" width="40%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="rounded" width="60%" height={14} />
      </Box>
    ))}
  </Box>
);

const SkeletonLoader = ({ type = 'table', rows = 5, count = 3 }) => {
  if (type === 'card') return <CardSkeletonLoader count={count} />;
  if (type === 'stat') return <StatCardSkeletonLoader />;
  return <TableSkeletonLoader rows={rows} />;
};

export default SkeletonLoader;
