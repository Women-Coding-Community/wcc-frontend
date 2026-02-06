# Test Plan V2

## Overview

This test plan focuses on **critical user journeys** that require end-to-end validation. Tests that verify component rendering, static content, or isolated functionality should be covered by unit tests instead.

## Guiding Principles

**Include in E2E:**
- External navigation (opens new tabs, third-party sites)
- Multi-step user flows (registration, mentor matching)
- Critical business paths (join community, find mentor)
- Integration between pages and components
- API-dependent functionality

**Exclude from E2E (Cover in Unit Tests):**
- Component rendering verification
- Static text/title display
- Individual dropdown items
- Internal link existence
- Responsive layout tests
- Single component interactions

## Critical User Journeys (Priority: High)

These are the most important flows that must work for users.

### TC-001: Join the Community
**User Goal:** New user wants to join the WCC community via Slack

**Steps:**
1. Navigate to Home page
2. Click "Join our Slack" button in hero section
3. Verify redirect to Slack invitation page (new tab)
4. Verify Slack URL contains `womencodingcommunity.slack.com`
5. Verify page title contains "Slack"

**Status:** 

---

### TC-002: Find a Mentor
**User Goal:** User wants to browse available mentors and view profiles

**Steps:**
1. Click "Find a mentor" button in navigation
2. Verify redirect to mentors listing page (/mentorship/mentors)
3. Verify mentor cards are displayed with:
   - Mentor name
   - Expertise/skills (programming languages)
   - Profile image
4. Verify mentor detail information is accessible via tabs:
   - Presentation tab (default)
   - Skills & Support Areas tab
   - Reviews tab
   - Resources tab

**Status:** 

---

### TC-003: Register as Mentor
**User Goal:** User wants to sign up to become a mentor

**Steps:**
1. Navigate to Home page
2. Click "Join as a mentor" button in "Become a Mentor" section
3. Verify redirect to mentor registration page (/mentorship/mentor-registration)
4. Verify registration page loads successfully

**Future Implementation:** Form validation will be added when registration form is built

**Status:** 

---

### TC-004: Register as Mentee
**User Goal:** User wants to sign up to find a mentor

**Steps:**
1. Navigate to Mentorship page (/mentorship)
2. Click "Find a mentor" button in "Become a mentee" section
3. Verify redirect to mentor browsing page (/mentorship/mentors)
4. Verify mentor page loads successfully

**Status:** 

---

### TC-005: Explore Programmes
**User Goal:** User wants to explore different programmes offered

**Steps:**
1. Navigate to Home page
2. Click on each programme tile:
   - Mentorship → /mentorship
   - Events → /events
   - Book Club → /programmes/book-club
   - CV Clinic → /programmes/cv-clinic
   - Mock Interviews → /programmes/interviews
   - Leetcode → /programmes/leetcode
3. Verify each page loads at correct URL

**Status:**

---

### TC-006: View Events
**User Goal:** User wants to see upcoming events and register

**Steps:**
1. Navigate to Home page
2. Verify at least one event card is displayed
3. Click event CTA button (e.g., "Go to Meetup event")
4. Verify redirect to external event platform in new tab
5. Verify external URL contains "meetup.com"

**Status:** 

---

### TC-007: Learn About Volunteering
**User Goal:** User wants to volunteer with WCC

**Steps:**
1. Navigate to Home page
2. Click "Learn more about volunteering" button
3. Verify redirect to volunteer page (/about-us/volunteer)
4. Verify volunteer page loads successfully

**Status:** 

---

## Secondary Flows (Priority: Medium)

### TC-008: Navigate to External Social Media
**User Goal:** User wants to follow WCC on social media

**Test Cases:**
- Footer LinkedIn link → Opens LinkedIn in new tab
- Footer GitHub link → Opens GitHub in new tab
- Footer Instagram link → Opens Instagram in new tab
- Footer Slack link → Opens Slack signup in new tab

**Status:** 

---

### TC-009: Report Technical Issues
**User Goal:** User encounters a bug and wants to report it

**Steps:**
1. Scroll to footer
2. Click "Send us a report on Github" link
3. Verify redirect to GitHub issues page

**Status:** 

---

### TC-010: Contact via Email
**User Goal:** User wants to email WCC

**Steps:**
1. Scroll to footer
2. Click email icon
3. Verify mailto link opens default email client

**Status:** 

---

### TC-011: Browse Mentorship Feedback
**User Goal:** User wants to read testimonials from mentors/mentees

**Steps:**
1. Navigate to Mentorship page
2. Scroll to "What do participants think?" section
3. Verify testimonial cards are displayed
4. Click "Show more" button
5. Verify additional testimonials load

**Status:** 
