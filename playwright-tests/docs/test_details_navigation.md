# Navigation tests

Tests to check links and page navigations.

---

## NAV-001: Primary Navigation Links

**User Goal:** User wants to navigate to main sections of the website

**Steps to Reproduce:**

1. Launch the application in the browser
2. Click on each link in the navigation bar one by one:
   - Home link
   - Events link
   - Blog link
   - Jobs link

**Expected Result:**

- **Home** → User redirected to Home page with base URL, "Women Coding Community" header displayed
- **Events** → User redirected to "/events" page, "Welcome to the EventsPage" text present
- **Blog** → User redirected to "/blog" page, "Welcome to the Blog Page" text present
- **Jobs** → User redirected to "/jobs" page, "Welcome to the JobsPage" text present

**Status:** Done :white_check_mark: (NAV-001 to NAV-004)

---

## NAV-006: Logo Navigation

**User Goal:** User wants to return to home page from any page by clicking logo

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Navigate to any page in the application.
3. Click on the website logo in the header (top-left corner).

**Expected Result:**

- The user is redirected to the Home page regardless of their current page.
- The Home page content loads correctly without errors.

**Status:** Done ::

---

## NAV-008: Mentorship Dropdown Navigation

**User Goal:** User wants to access different mentorship program pages through dropdown menu

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

## NAV-010: Programmes Dropdown Navigation

**User Goal:** User wants to access different programme pages through dropdown menu

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

## NAV-012: About Us Dropdown Navigation

**User Goal:** User wants to access company information pages through dropdown menu

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

## NAV-014

**Title:** Navigate to External Social Media

**User Goal:** User wants to follow WCC on social media

**Steps to Reproduce:**

- Footer LinkedIn link → Opens LinkedIn in new tab (`https://www.linkedin.com/company/womencodingcommunity`)
- Footer GitHub link → Opens GitHub in new tab (`https://github.com/WomenCodingCommunity`)
- Footer Instagram link → Opens Instagram in new tab (`https://www.instagram.com/women_coding_community/#`)
- Footer Slack link → Opens Slack signup in new tab (`https://womencodingcommunity.slack.com/signup#/domain-signup`)

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

---

## NAV-018: Email Contact

**User Goal:** User wants to email WCC

**Steps to Reproduce:**

1. Scroll to footer
2. Click email icon
3. Verify mailto link opens default email client

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-019: Report Technical Issues

**User Goal:** User encounters a bug and wants to report it

**Steps to Reproduce:**

1. Scroll to footer
2. Click "Send us a report on Github" link
3. Verify redirect to GitHub issues page

**Status:** Done :white_check_mark:

**Assigned to:** Pranita

---

## NAV-020: Visual Test: Navigation - Desktop Menu

This check is critical for site navigation, users can't navigate without this and it is likely to break with CSS changes.

**Test Cases:**

- VT-001-A: Navigation bar
- VT-001-B: Mentorship dropdown expanded
- VT-001-C: Programmes dropdown expanded
- VT-001-D: About Us dropdown expanded

**Status:** Not implemented

---

### NAV-021: Visual Test: Navigation - Mobile Menu

This check is critical, as it is completely different UX from desktop, separate implementation, critical for users on mobile.

**Test Cases:**

- VT-002-A: Mobile menu closed
- VT-002-B: Mobile drawer opened
- VT-002-C: Mobile submenu expanded

**Status:** Not implemented
