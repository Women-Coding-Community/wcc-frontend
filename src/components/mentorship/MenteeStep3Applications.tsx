import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import MentorApplicationCard, { MentorOption } from './MentorApplicationCard';
import StepSection from './StepSection';

interface Props {
  mentors: MentorOption[];
}

const MAX_APPLICATIONS = 5;

/**
 * Step 3 of the mentee registration wizard.
 * Allows selecting up to 5 mentor preferences, each with priority and messages.
 */
const MenteeStep3Applications = ({ mentors }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applications',
  });

  const handleAddMentor = () => {
    append({
      mentorId: 0,
      priorityOrder: fields.length + 1,
      whyMentor: '',
      applicationMessage: '',
    });
  };

  const applicationsError = errors.applications as any;

  return (
    <StepSection
      title="Mentor Preferences"
      description="Select up to 5 mentors you would like to work with, ranked by priority. Your top choice should be priority 1."
    >
      {fields.length === 0 && (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No mentor selected yet. Add your first mentor preference below.
          </Typography>
        </Box>
      )}

      {fields.map((field, index) => (
        <MentorApplicationCard
          key={field.id}
          index={index}
          mentors={mentors}
          onRemove={() => remove(index)}
        />
      ))}

      {typeof applicationsError === 'string' && (
        <FormHelperText error sx={{ mb: 2 }}>
          {applicationsError}
        </FormHelperText>
      )}
      {applicationsError?.message && (
        <FormHelperText error sx={{ mb: 2 }}>
          {applicationsError.message}
        </FormHelperText>
      )}

      {fields.length < MAX_APPLICATIONS && (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddMentor}
          sx={{ mt: 1 }}
        >
          Add mentor preference
        </Button>
      )}

      {fields.length >= MAX_APPLICATIONS && (
        <Typography variant="caption" color="text.secondary">
          Maximum of {MAX_APPLICATIONS} mentor preferences reached.
        </Typography>
      )}
    </StepSection>
  );
};

export default MenteeStep3Applications;
