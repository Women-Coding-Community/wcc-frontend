# Navigation tests

Tests to check links and page navigations.

---

## NAV-001

**Title:** Click Home Link

**Description:** Testing the Home navigation link functionality.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Click on the Home link in the navigation bar.

**Expected Result:**

- The user is redirected to the Home page.
- The user is redirected to the Home page with the base url.
- Header "Women Coding Community" should be displayed.

**Status:** Done :white_check_mark:

---

## NAV-002

**Title:** Click Events Link

**Description:** Testing the Events navigation link functionality.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Click on the Events link in the navigation bar.

**Expected Result:**

- The user is redirected to the Events page with url "/events"
- "Welcome to the EventsPage" text should be present

**Status:** Done :white_check_mark:

---

## NAV-003

**Title:** Click Blog Link

**Description:** Testing the Blog navigation link functionality.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Click on the Blog link in the navigation bar.

**Expected Result:**

- The user is redirected to the Blog page with url "/blog"
- "Welcome to the Blog Page" text should be present

**Status:** Done :white_check_mark:

---

## NAV-004

**Title:** Click Jobs Link

**Description:** Testing the Jobs navigation link functionality.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Click on the Jobs link in the navigation bar.

**Expected Result:**

- The user is redirected to the Jobs page with url "/jobs"
- "Welcome to the JobsPage" text should be present

**Status:** Done :white_check_mark:

---

## NAV-005

**Title:** Click Find a mentor button

**Description:** Testing the Find a Mentor button functionality.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Click on the Find a Mentor link in the navigation bar.

**Expected Result:**

- The user is redirected to the Jobs page with url "/mentors"
- "Meet Our Mentors!" text should be present

**Status:** Pending :x:

---

## NAV-006

**Title:** Click on the website logo in the header

**Description:** Testing logo click navigation to ensure it returns user to home page.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Click on the Find a Mentor link in the navigation bar.
3. Click on the website logo in the header (top-left corner).

**Expected Result:**

- The user is redirected to the Home page regardless of their current page.
- The Home page content loads correctly without errors.

**Status:** Done ::

---

## NAV-007

**Title:** Hover over "Mentorship" dropdown

**Description:** Testing the Mentorship dropdown menu display.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Hover over the "Mentorship" dropdown in the header navigation.
3. Observe that the dropdown menu expands showing available options.

**Expected Result:**
On hover, the dropdown expands and displays the following options:

- Overview
- Mentors
- Study Groups
- Resources
- Code Of Conduct
- FAQ
- Long-Term Timeline
- Ad-Hoc Timeline

**Status:** Done :x:

**Assigned to:** Purnima

---

## NAV-008

**Title:** Click each item in the Mentorship dropdown

**Description:** Testing all navigation items within the Mentorship dropdown menu.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Hover over the "Mentorship" dropdown in the header navigation.
3. Click each item in the dropdown one by one.

**Expected Result:**
On clicking each option:

- **Overview** → User should be redirected to the Mentorship overview page with Page title as "Mentorship Programme" and url as "/mentorship"
- **Mentors** → User should be redirected to the Mentors listing page with page title as "Meet Our Mentors!" and url as "/mentors"
- **Study Groups** → User should be redirected to the Study Group listing page with page title as "Study Groups" and url as "/programme-study-group"
- **Resources** → User should be redirected to the Study Group page with page title as "Study Groups" and url as "/programme-study-group"
- **Code Of Conduct** → User should be redirected to the Code Of Conduct page with page title as "Mentorship Code of Conduct" and url as "/mentorship-code-of-conduct"
- **FAQ** → User should be redirected to the FAQ page with page title as "Mentorship FAQ" and url as "/mentorship-faq"
- **Long-Term Timeline** → User should be redirected to the Long-Term Timeline page with page title as "Long-Term Timeline" and url as "/mentorship-long-term-timeline"
- **Ad-Hoc Timeline** → User should be redirected to the Ad-hoc Timeline page with page title as "Ad-hoc Timeline" and url as "/mentorship-adhoc-timeline"

**Status:** Pending :x:

**Assigned to:** Mioara

---

## NAV-009

**Title:** Hover over "Programmes" dropdown

**Description:** Testing the Programmes dropdown menu display.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Hover over the "Programmes" dropdown in the header navigation.
3. Observe that the dropdown menu expands showing available options.

**Expected Result:**
On hover, the dropdown expands and displays the following options:

- Interview Preparation
- Machine Learning
- Book Club
- Writing Club
- Coding Club
- Speaking Club

**Status:** Done :x:

**Assigned to:** Purnima

---

## NAV-010

**Title:** Click each item in the Programmes dropdown

**Description:** Testing all navigation items within the Programmes dropdown menu.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Hover over the "Programmes" dropdown in the header navigation.
3. Click each item in the dropdown one by one.

**Expected Result:**
On clicking each option:

- **Interview Preparation** → User should be redirected to the Interview Preparation page with page title as "Interview Preparation" and URL as "/programme-interview-preparation"
- **Machine Learning** → User should be redirected to the Machine Learning programme page with page title as "Machine Learning Programme" and URL as "/programme-machine-learning"
- **Book Club** → User should be redirected to the Book Club page with page title as "Book Club Programme" and URL as "/programme-book-club"
- **Writing Club** → User should be redirected to the Writing Club page with page title as "Writing Club Programme" and URL as "/programme-writing-club"
- **Coding Club** → User should be redirected to the Coding Club page with page title as "Coding Club Programme" and URL as "/programme-coding-club"
- **Speaking Club** → User should be redirected to the Speaking Club page with page title as "Speaking Club Programme" and URL as "/programme-speaking-club"

**Status:** Pending :x:

**Assigned to:** Isabel

---

## NAV-011

**Title:** Hover over "About Us" dropdown

**Description:** Testing the About Us dropdown menu display.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Hover over the "About Us" dropdown in the header navigation.
3. Observe that the dropdown menu expands showing available options.

**Expected Result:**
On hover, the dropdown expands and displays the following options:

- Overview
- Team
- Code Of Conduct
- Partners
- Volunteer

**Status:** Pending :x:

**Assigned to:** Purnima

---

## NAV-012

**Title:** Click each item in the About Us dropdown

**Description:** Testing all navigation items within the About Us dropdown menu.

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Hover over the "About Us" dropdown in the header navigation.
3. Click each item in the dropdown one by one.

**Expected Result:**
On clicking each option:

- **Overview** → User should be redirected to the About Us overview page with page title as "About Us" and URL as "/about"
- **Team** → User should be redirected to the Team page with page title as "Meet our team" and URL as "/team"
- **Code Of Conduct** → User should be redirected to the Code of Conduct page with page title as "Code of Conduct" and URL as "/code-of-conduct"
- **Partners** → User should be redirected to the Partners page with page title as "Partners" and URL as "/partners"
- **Volunteer** → User should be redirected to the Volunteer page with page title as "Volunteer" and URL as "/volunteer"

**Status:** Done :white_check_mark:

---

## NAV-013

**Title:** Validate footer logo and static text

**Description:** Testing footer logo and static text

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Scroll down to the Footer

**Expected Result:**

- Footer Logo should be visible and on clicking the Logo, user should be redirected to Home Page <br/>
  Below text should be present:
  - Women Coding Community is a not-for-profit organisation.
  - © 2024 Women Coding Community
  - Follow Us
  - Join us on social media and stay tuned.
  - Experiencing Technical Issues?

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-014

**Title:** Check Footer LinkedIn Icon and Link

**Description:** Testing LinkedIn social media link functionality in the footer

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Scroll down to the Footer
3. Click on the LinkedIn icon

**Expected Result:**

- LinkedIn icon should be visible in the footer
- On clicking the LinkedIn link, user should be redirected to the destination URL "https://www.linkedin.com/company/womencodingcommunity"
- Link should open in a new tab/window

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-015

**Title:** Check Footer GitHub Icon and Link

**Description:** Testing GitHub social media link functionality in the footer

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Scroll down to the Footer
3. Click on the GitHub icon

**Expected Result:**

- GitHub icon should be visible in the footer
- On clicking the GitHub link, user should be redirected to the destination URL "https://github.com/WomenCodingCommunity"
- Link should open in a new tab/window

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-016

**Title:** Check Footer Instagram Icon and Link

**Description:** Testing Instagram social media link functionality in the footer

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Scroll down to the Footer
3. Click on the Instagram icon

**Expected Result:**

- Instagram icon should be visible in the footer
- On clicking the Instagram link, user should be redirected to the destination URL "https://www.instagram.com/women_coding_community/#"
- Link should open in a new tab/window

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-017

**Title:** Check Footer Slack icon and Link

**Description:** Testing Slack community link functionality in the footer

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Scroll down to the Footer
3. Click on the Slack icon

**Expected Result:**

- Slack icon should be visible in the footer
- On clicking the Slack link, user should be redirected to the destination URL "https://womencodingcommunity.slack.com/signup#/domain-signup"
- Link should open in a new tab/window

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-018

**Title:** Check Footer Email Link

**Description:** Testing Email icon and link

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Scroll down to the Footer
3. Click on the Email icon

**Expected Result:**

- Email icon should be visible in the footer
- On clicking the Email link, user's default email client should open with the destination URL "mailto:london@womencodingcommunity.com"
- The link should use "mailto:" protocol

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-019

**Title:** Check Footer "Send a report" Link

**Description:** Testing the technical issues report link functionality in the footer

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Scroll down to the Footer
3. Click on the "Send us a report" link

**Expected Result:**

- "Send us a report" link should be visible in the footer
- On clicking the link, user should be redirected to the destination URL "https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FWomen-Coding-Community%2FWomenCodingCommunity.github.io%2Fissues%2Fnew%3Ftemplate%3Dbug_report.md%26title%3Dbug%2520title"
- Link should open in a new tab/window

**Status:** Done :white_check_mark:

**Assigned to:** Pranita
