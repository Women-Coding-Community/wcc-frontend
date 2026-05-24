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

## NAV-002: Find a Mentor Button Navigation

**User Goal:** User wants to find a mentor by clicking the "Find a Mentor" button on the home page

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Navigate to the Home page.
3. Click the "Find a Mentor" button.

**Expected Result:**

- The user is redirected to `/mentorship/mentors`.

**Status:** Done :white_check_mark:

---

## NAV-003: Logo Navigation

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

## NAV-004: Mentorship Dropdown Navigation

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

**Status:** Done :white_check_mark:

---

## NAV-005: Programmes Dropdown Navigation

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

**Status:** Done :white_check_mark:

---

## NAV-006: About Us Dropdown Navigation

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

## NAV-007: Footer Static Content

**User Goal:** User wants to verify footer branding and informational text is displayed

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Navigate to the Home page.
3. Scroll to the footer.

**Expected Result:**

- Footer logo is visible
- Non-profit text is visible
- Copyright text is visible
- "Follow Us" title is visible
- "Follow Us" description is visible
- Technical issues text is visible

**Status:** Done :white_check_mark:

---

## NAV-008: Footer Social Links

**User Goal:** User wants to follow WCC on social media or get in touch via footer links

**Steps to Reproduce:**

1. Launch the application in the browser.
2. Navigate to the Home page.
3. Scroll to the footer.
4. Click each social/contact link one by one.

**Expected Result:**

- **LinkedIn** → Opens `https://www.linkedin.com/company/womencodingcommunity`
- **GitHub** → Opens `https://github.com/WomenCodingCommunity`
- **Instagram** → Opens Instagram page matching `instagram.com.*women_coding_community`
- **Slack** → Opens Slack invite link
- **Email** → Opens `mailto:london@womencodingcommunity.com`
- **Send us a report** → Opens GitHub issues page in new tab

**Status:** Done :white_check_mark:

---

## NAV-009: Visual Test: Navigation - Desktop Menu

This check is critical for site navigation, users can't navigate without this and it is likely to break with CSS changes.

**Test Cases:**

- VT-001-A: Navigation bar
- VT-001-B: Mentorship dropdown expanded
- VT-001-C: Programmes dropdown expanded
- VT-001-D: About Us dropdown expanded

**Status:** Done :white_check_mark:

---

### NAV-010: Visual Test: Navigation - Mobile Menu

This check is critical, as it is completely different UX from desktop, separate implementation, critical for users on mobile.

**Test Cases:**

- VT-002-A: Mobile menu closed
- VT-002-B: Mobile drawer opened
- VT-002-C: Mobile submenu expanded

**Status:** Done :white_check_mark:
