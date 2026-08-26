import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  mobile: yup
    .string()
    .required('Mobile is required')
    .matches(/^\d{10}$/, 'Mobile must be exactly 10 digits'),
  country: yup.string().required('Country is required'),
  state: yup
    .string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be at most 50 characters'),
  district: yup
    .string()
    .required('District is required')
    .min(2, 'District must be at least 2 characters')
    .max(50, 'District must be at most 50 characters'),
});

const EmployeeForm = ({ defaultValues = {}, countries = [], onSubmit, loading = false, isEdit = false }) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      country: '',
      state: '',
      district: '',
      ...defaultValues,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={isEdit ? 'Edit employee form' : 'Add employee form'}
    >
      <div className="form-grid">
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              id="employee-name"
              error={!!errors.name}
              helperText={errors.name?.message}
              inputProps={{ 'aria-required': 'true', maxLength: 50 }}
              placeholder="e.g. John Doe"
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              id="employee-email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              inputProps={{ 'aria-required': 'true' }}
              placeholder="e.g. john@company.com"
            />
          )}
        />

        {/* Mobile */}
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Mobile Number"
              id="employee-mobile"
              error={!!errors.mobile}
              helperText={errors.mobile?.message || '10 digits only'}
              inputProps={{ 'aria-required': 'true', maxLength: 10, inputMode: 'numeric' }}
              placeholder="e.g. 9876543210"
            />
          )}
        />

        {/* Country */}
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <FormControl size="small" error={!!errors.country}>
              <InputLabel id="employee-country-label">Country</InputLabel>
              <Select
                {...field}
                labelId="employee-country-label"
                id="employee-country"
                label="Country"
                aria-required="true"
              >
                {countries.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
            </FormControl>
          )}
        />

        {/* State */}
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="State / Province"
              id="employee-state"
              error={!!errors.state}
              helperText={errors.state?.message}
              inputProps={{ 'aria-required': 'true', maxLength: 50 }}
              placeholder="e.g. Maharashtra"
            />
          )}
        />

        {/* District */}
        <Controller
          name="district"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="District / City"
              id="employee-district"
              error={!!errors.district}
              helperText={errors.district?.message}
              inputProps={{ 'aria-required': 'true', maxLength: 50 }}
              placeholder="e.g. Mumbai"
            />
          )}
        />
      </div>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <Button
          type="button"
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(-1)}
          disabled={loading}
          sx={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
            '&:hover': { borderColor: 'var(--color-text-secondary)' },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <SaveRoundedIcon sx={{ fontSize: 18 }} />
            )
          }
          aria-label={isEdit ? 'Update employee' : 'Save employee'}
        >
          {loading ? 'Saving…' : isEdit ? 'Update Employee' : 'Add Employee'}
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
