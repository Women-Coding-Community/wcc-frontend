# Mentorship tests

Tests to check mentorship page behaviour.

---

## MENT-002

**Title:** Register as Mentor

**User Goal:** User wants to sign up to become a mentor

**Steps to Reproduce:**

1. Navigate to Home page
2. Click "Join as a mentor" button in "Become a Mentor" section
3. Verify redirect to mentor registration page (/mentorship/mentor-registration)
4. Verify registration page loads successfully

**Future Implementation:** Form validation will be added when registration form is built

**Status:** Pending :x:

---

## MENT-003

**Title:** Find a Mentor

**User Goal:** User wants to browse available mentors and view profiles

**Steps to Reproduce:**

**Steps:**

1. Click "Find a mentor" button in navigation
2. Verify redirect to mentors listing page (`/mentorship/mentors`)
3. Verify mentor cards are displayed with:
   - Mentor name
   - Expertise/skills (programming languages)
   - Profile image
4. Verify mentor detail information is accessible via tabs:
   - Presentation tab (default)
   - Skills & Support Areas tab
   - Reviews tab
   - Resources tab

**Status:** Pending :x:

---

## MENT-004

**Title:** Browse Mentorship Feedback

**User Goal:** User wants to read testimonials from mentors/mentees

**Steps to Reproduce:**

1. Navigate to Mentorship page
2. Scroll to "What do participants think?" section
3. Verify testimonial cards are displayed
4. Click "Show more" button
5. Verify additional testimonials load

**Status:** Done :white_check_mark: (combine MENT-004 and MENT-005)

---

### MENT-005: Visual Test: Mentors Page - Mentor Grid

It is important to test, as it is a core feature of the platform, mentor discovery is primary use case. Cards have overflow issues with long names/many tags. High visual complexity: images, tags, buttons, spacing.

**Test Cases:**
Verify grid of mentor profile cards

**Status:** Not implemented

---

### MENT-006: Visual Test: FAQ Page

**Visual Elements to Verify:**

- Accordion headers display correctly
- Expand/collapse icons visible and positioned
- Expanded content doesn't overflow or wrap badly
- Text handles long questions/answers
- Spacing between items consistent

**Status:** Not implemented
