# Mentorship tests

Tests to check mentorship page behaviour.

---

## MENT-001

**Title:** Navigate to the Mentorship page

**Description:** Testing basic accessibility and loading of the Mentorship page.

**Steps to Reproduce:**

1. Open a supported browser.
2. In the browser's address bar, enter the URL: http://localhost:3001/mentorship.

**Expected Result:**

- The Mentorship page loads successfully without errors.
- The page content (title, description, navigation bar, footer) is displayed correctly.
- The page title in the browser tab should reflect Mentorship Programme.

**Status:** Pending :x:

---

## MENT-002

**Title:** Validate "Become a mentor" Section and click on the "Join as a mentor" button

**Description:** Testing the Become a Mentor section display and functionality.

**Steps to Reproduce:**

1. Open a supported browser.
2. Navigate to the Mentorship page: http://localhost:3001/mentorship.
3. Scroll down to the section titled "Become a Mentor".
4. Click on the "Join as a mentor" button.

**Expected Result:**

- The Title and Description are correctly displayed with proper formatting:
  - **Title:** "Become a Mentor"
  - **Description:** "You should become a mentor if you:
    - Want to extend your professional network
    - Want to contribute to the community
    - You are ready to share expertise
    - You want to get a new perspective and learn from your mentees"
- The "Join as a mentor" button is visible, styled correctly, and clickable.
- On clicking the button, the user is redirected to Google Form.

**Status:** Pending :x:

---

## MENT-003

**Title:** Validate "Become a mentee" Section and click on the "Find a mentor" button

**Description:** Testing the Become a Mentee section display and navigation.

**Steps to Reproduce:**

1. Open a supported browser.
2. Navigate to the Mentorship page: http://localhost:3001/mentorship.
3. Scroll down to the section titled "Become a mentee".
4. Click on the "Find a mentor" button.

**Expected Result:**

- The Title and Description are correctly displayed with proper formatting:
  - **Title:** "Become a Mentee"
  - **Description:** "You should become a mentee if you:
    - Want to start a career in software engineering
    - Want to find a better job
    - Want to be promoted at work
    - Want to apply for a leadership position
    - Need support in advancing your career"
- The "Find a mentor" button is visible, styled correctly, and clickable.
- On clicking the button, the user is redirected to the Meet Our Mentors page.
- The page title and URL should reflect mentor registration (e.g., http://localhost:3001/mentorship/mentors).

**Status:** Pending :x:

---

## MENT-004

**Title:** Verify title and cards

**Description:** Testing the display of testimonials in the Feedback section.

**Steps to Reproduce:**

1. Open a supported browser.
2. Navigate to the Mentorship page: http://localhost:3001/mentorship.
3. Scroll down to the section titled "What do participants think about our Mentorship Programme?"

**Expected Result:**

- The Title and Testimonials are correctly displayed with proper formatting.
- **Title:** "What do participants think about our Mentorship Programme?"
- Multiple testimonial cards are displayed with:
  - Quotation icon
  - Testimonial text
  - Mentor name and year (e.g., Lucy, Mentor 2024)
- Each testimonial card should be properly aligned, styled, and without text cutoff.

**Status:** Done :white_check_mark:

---

## MENT-005

**Title:** Click on Show more button

**Description:** Testing the Show More functionality to load additional testimonials.

**Steps to Reproduce:**

1. Open a supported browser.
2. Navigate to the Mentorship page: http://localhost:3001/mentorship.
3. Scroll down to the section titled "What do participants think about our Mentorship Programme?"
4. Click on Show More Button.

**Expected Result:**

- On clicking the "Show more" button:
  - Additional testimonial cards are displayed.
  - The space with the testimonial cards is expanded to accommodate the newly loaded content.

**Status:** Done :white_check_mark:
