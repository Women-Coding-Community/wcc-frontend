# Home Page tests

Tests to check home page behaviour.

---

## HP-001

**Title:** Click on the "Join our Slack" button

**Description:** Testing the Join our Slack button functionality on the landing section.

**Steps to Reproduce:**

1. Launch WCC website on the browser
2. Navigate to Home Page.
3. On the landing section, locate the text link "Join our Slack" below the heading Women Coding Community and subheading Empowering Women in Their Tech Careers.
4. Click on the "Join our Slack" link.

**Expected Result:**

- The user is redirected to the Slack invitation page in a new tab/window.
- The Slack page should display the header: "Join Women Coding Community on Slack".
- The page should provide options to join via:
  - Continue with Google
  - Continue with Apple
  - Or enter an @surrealdb.com email address
- The URL should point to the official Slack invitation link: "https://womencodingcommunity.slack.com/signup#/domain-signup"

**Status:** Done :white_check_mark:

---

## HP-002

**Title:** Verify Title and Description. Click on each program link

**Description:** Testing the Opportunities and Programmes section display and navigation.

**Steps to Reproduce:**

1. Launch WCC website on the browser
2. Navigate to Home Page.
3. Scroll down until you see the section titled "Opportunities and Programmes".
4. Under this section, verify that the following program tiles are visible and clickable:
   - Mentorship
   - Online and in-person Events
   - Book Club
   - CV clinic
   - Mock interviews
   - Leetcode
5. Click each program link one by one.

**Expected Result:**

- On Home Page, the Title and Description under "Opportunities and Programmes" section are correctly displayed with proper formatting and alignment.
  - **Title:** "Opportunities and Programmes"
  - **Description:** "Join our community and unlock endless opportunities…help you achieve your goals."
- Each program tile is clickable.
- On clicking each program link:
  - **Mentorship** → The user is redirected to the Mentorship page with url "/mentorship" and "Mentorship Programme" text should be present
  - **Online and in-person Events** → The user is redirected to the Events page with url "/events" and "Welcome to the EventsPage" text should be present
  - **Book Club** → The user is redirected to the Book Club page with url "/programmes/book-club" and "Welcome to the BookClubPage" text should be present
  - **CV clinic** → The user is redirected to the CV Clinic page with url "/programmes/cv-clinic" and "Welcome to the CVClinicPage" text should be present
  - **Mock interviews** → The user is redirected to the Mock Interviews page with url "/programmes/interviews" and "Welcome to the MockInterviewPage" text should be present
  - **Leetcode** → The user is redirected to the Leetcode page with url "programmes/leetcode" and "Welcome to the LeetcodePage" text should be present
- Each redirected page should load successfully with its respective content, correct page title, and expected URL.

**Status:** Pending :x:

---

## HP-003

**Title:** Verify Events Card information

**Description:** Testing the display and functionality of event cards in the Latest Events section.

**Steps to Reproduce:**

1. Launch WCC website on the browser
2. Navigate to Home Page.
3. Scroll down to the Events section.
4. Click on the CTA Button of any event.

**Expected Result:**

- Event cards should display all below required information in a consistent and readable format:
  - Event Type (e.g., IN_PERSON, ONLINE_MEETUP) displayed as a label/tag
  - Date & Time with proper formatting (day, month, year, start–end time, timezone)
  - Event Title (e.g., "Kedro: An open-source project for building maintainable data science pipelines")
  - Speaker Name (e.g., Speaker: Merel Theisen)
  - Event Description (short summary of the event)
  - Event Image/Thumbnail (if available)
  - CTA Button (e.g., "Send us a report on Github" or "Go to Meetup event")
- Clicking the CTA Button should redirect the user to the respective external event details page (e.g., GitHub, Meetup).
- The View all events link at the top right should redirect to a dedicated Events page containing all events.

**Status:** Pending :x:

---

## HP-004

**Title:** Verify Description and the Title, click on Join as Mentor

**Description:** Testing the Become a Mentor section and mentor registration flow.

**Steps to Reproduce:**

1. Launch WCC website on the browser
2. Navigate to Home Page.
3. Scroll down to the section titled "Become a Mentor".
4. Click on the "Join as a mentor" button.

**Expected Result:**

- The Title and Description are correctly displayed with proper formatting:
  - **Title:** "Become a Mentor"
  - **Description:** "Ready to empower and be empowered in tech? Become a mentor! Expand your network, give back, share expertise, and discover new perspectives."
- The "Join as a mentor" button is visible, styled correctly, and clickable.
- On clicking the button, the user is redirected to the Mentor Registration Page.
- The Mentor Registration Page should display the registration form with fields required for mentor sign-up.
- The page title and URL should reflect mentor registration (e.g., /mentorship/mentor-registration).

**Status:** Done :white_check_mark:

---

## HP-005

**Title:** Verify Description and Title, click on "Learn more about Volunteering" button

**Description:** Testing the Volunteer section and navigation to volunteer information page.

**Steps to Reproduce:**

1. Launch WCC website on the browser
2. Navigate to Home Page.
3. Scroll down to the Volunteer Section.
4. Click on the "Learn more about volunteering" button.

**Expected Result:**

- The Title and Description are correctly displayed with proper formatting and alignment:
  - **Title:** "Do you want to volunteer with us?"
  - **Description:** "Empowering women in their tech careers through education, mentorship, community building, and career services is our mission. We provide workshops and events, connect members with industry mentors, foster a supportive community through meetups and conferences, and raise awareness for more inclusive industry practices."
- The "Learn more about volunteering" button is visible, styled correctly, and clickable.
- On clicking the button, the user is redirected to the Volunteer Page.
- The Volunteer Page should display information about volunteering opportunities, guidelines, and how to apply.
- The page title and URL should reflect volunteering (e.g., /volunteer).

**Status:** Done :white_check_mark:
