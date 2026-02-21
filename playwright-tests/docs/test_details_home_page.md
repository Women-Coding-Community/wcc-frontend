# Home Page tests

Tests to check home page behaviour.

---

## HP-001

**Title:** Join the Community

**User Goal:** New user wants to join the WCC community via Slack

**Steps to Reproduce:**

1. Navigate to Home page
2. Click "Join our Slack" button in hero section
3. Verify redirect to Slack invitation page (new tab)
4. Verify Slack URL contains `womencodingcommunity.slack.com`
5. Verify page title contains "Slack"

**Status:** Done :white_check_mark:

---

## HP-002

**Title:** Explore Programmes

**User Goal:** User wants to explore different programmes offered

**Steps to Reproduce:**

1. Navigate to Home page
2. Click on each programme tile:
   - Mentorship → /mentorship
   - Events → /events
   - Book Club → /programmes/book-club
   - CV Clinic → /programmes/cv-clinic
   - Mock Interviews → /programmes/interviews
   - Leetcode → /programmes/leetcode
3. Verify each page loads at correct URL

**Status:** Done :white_check_mark:

---

## HP-003

**Title:** View Events

**User Goal:** User wants to see upcoming events and register

**Steps to Reproduce:**

1. Navigate to Home page
2. Verify at least one event card is displayed
3. Click event CTA button (e.g., "Go to Meetup event")
4. Verify redirect to external event platform in new tab
5. Verify external URL contains "meetup.com"

**Status:** Pending :x:

---

## HP-005

**Title:** Learn About Volunteering

**User Goal:** User wants to volunteer with WCC

**Steps to Reproduce:**

1. Navigate to Home page
2. Click "Learn more about volunteering" button
3. Verify redirect to volunteer page (/about-us/volunteer)
4. Verify volunteer page loads successfully

**Status:** Done :white_check_mark:
