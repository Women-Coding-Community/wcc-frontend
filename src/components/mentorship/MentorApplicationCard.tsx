import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { inputStyle } from './mentorshipStyles';

export interface MentorOption {
  id: number;
  fullName: string;
  position?: string;
}

interface Props {
  index: number;
  mentors: MentorOption[];
  onRemove: () => void;
}

/**
 * A single mentor application card inside the mentee registration wizard.
 * Manages mentorId, priorityOrder, whyMentor and applicationMessage fields.
 */
const MentorApplicationCard = ({ index, mentors, onRemove }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const applicationErrors = (errors.applications as any)?.[index];

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 2,
        position: 'relative',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Mentor preference #{index + 1}
          </Typography>
          <Tooltip title="Remove this mentor selection">
            <IconButton
              size="small"
              onClick={onRemove}
              aria-label={`Remove mentor preference ${index + 1}`}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Mentor selector */}
        <Box sx={{ mb: 2 }}>
          <Controller
            name={`applications.${index}.mentorId`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel>Select mentor *</InputLabel>
                <Select
                  {...field}
                  label="Select mentor *"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  sx={inputStyle}
                >
                  {mentors.map((mentor) => (
                    <MenuItem key={mentor.id} value={mentor.id}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {mentor.fullName}
                        </Typography>
                        {mentor.position && (
                          <Typography variant="caption" color="text.secondary">
                            {mentor.position}
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Box>

        {/* Priority order */}
        <Box sx={{ mb: 2 }}>
          <Controller
            name={`applications.${index}.priorityOrder`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel>Priority *</InputLabel>
                <Select
                  {...field}
                  label="Priority *"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  sx={inputStyle}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n === 1 ? '1 — Top choice' : `${n}`}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Box>

        {/* Why this mentor (required) */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
          >
            Why did you choose this mentor? *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Explain why this mentor's skills and experience match your goals"
            {...register(`applications.${index}.whyMentor`)}
            error={!!applicationErrors?.whyMentor}
            helperText={applicationErrors?.whyMentor?.message as string}
            sx={inputStyle}
          />
        </Box>

        {/* Application message (optional) */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
          >
            Additional message to the mentor{' '}
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
            >
              (optional)
            </Typography>
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Anything else you would like the mentor to know about you?"
            {...register(`applications.${index}.applicationMessage`)}
            sx={inputStyle}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MentorApplicationCard;
