// src/components/mentorship/mentorshipStyles.ts

export const inputStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'custom.softGray',
    borderRadius: '4px',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': {
      border: '1px solid',
      borderColor: 'text.primary',
    },
  },
  '& .MuiInputBase-input': {
    padding: '16px 14px',
    fontSize: '16px',
    color: 'text.primary',
  },
  mb: 2,
};

export const boldLabelStyle = {
  fontWeight: 600,
  color: 'text.primary',
  mb: 1,
  display: 'block',
  fontSize: '15px',
  fontFamily: 'Roboto',
};

export const sectionHeaderStyle = {
  fontWeight: 700,
  color: 'text.primary',
  fontSize: '18px',
  mt: 4,
  mb: 2,
  fontFamily: 'Roboto',
};