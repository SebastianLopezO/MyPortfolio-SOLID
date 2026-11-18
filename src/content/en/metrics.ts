import type {Content} from "@/types/content";

export const metrics: Content["metrics"] = {
    title: "GitHub Metrics",
    subtitle: {
        general: "What is behind the numbers on my GitHub",
        backend: "What is behind the numbers in services, integrations and their upkeep",
        crm: "What is behind the numbers in CRM integrations and campaigns",
        data: "What is behind the numbers in Python hours, notebooks and data",
        devops: "What is behind the numbers in repository fleets, deploys and monitoring",
        fullstack: "What is behind the numbers in web products from end to end",
    },
    intro: {
        general: "A commit is not the work, but it leaves a trace of it. Below is where my commits went, how much time I spent in the editor and how the activity grew since 2022, with what each figure counts and what it does not.",
        backend: "Most of my time in the editor goes to Python, to the FastAPI services that connect the CRM with the academic systems. Their commits are the second band below.",
        crm: "Almost three in five commits are CRM and marketing work, between the landing pages that take each lead to the CRM and the services that keep it in sync with each institution's systems.",
        data: "The hours tell a different story from the commits. Python takes more than a third of the time WakaTime tracked, across services, Jupyter notebooks and data scripts.",
        devops: "Many of the commits come from keeping fleets in shape, with the same workflow, the same Dependabot setup or the same fix applied by a script to more than a hundred landing page repositories. That is why commits by language and hours do not match.",
        fullstack: "TypeScript leads the commits because it is the main language of the landing pages, of the SmartPot and GoPoli web apps and of this portfolio; the hours show how much time the Python and Java backends take.",
    },
    asOf: "Figures from {date}, refreshed on every deploy",
    pageLink: "See every metric and what it tells",
    labels: {
        contributions: "contributions since February 2022",
        commits: "commits since February 2022",
        activeDays: "days with at least one contribution",
        streak: "days in a row with contributions, still running",
        pullRequests: "pull requests opened",
        reviews: "pull requests reviewed",
        repos: "repositories I have contributed to",
        organizations: "organizations I am a member of",
    },
    areas: {
        title: "Where the commits are",
        note: "Commits on the default branch of the repositories I can query with the GitHub API, counted on {date}, which add up to {commits} in {repositories} repositories. The commit figure above comes from GitHub's contribution count and is higher than this sum.",
        commits: "commits",
        repositories: "repositories",
        items: {
            landings: {
                name: "Admissions landing pages",
                detail: "The agency's campaign landing pages. They include the visual builder's automatic commits and the changes I applied by script to the whole fleet.",
            },
            integrations: {
                name: "Integration services",
                detail: "The FastAPI services that connect Zoho CRM with each institution's academic systems.",
            },
            smartpot: {
                name: "SmartPot",
                detail: "The university IoT project, with firmware, API, web app, models and infrastructure.",
            },
            coursework: {
                name: "Degree coursework",
                detail: "One repository per course or project of the Computer Engineering degree.",
            },
            signatures: {
                name: "Email signatures",
                detail: "The TIVENOS email signature generator.",
            },
            other: {
                name: "Everything else",
                detail: "The agency's infrastructure and tools, the TIVENOS forms, widgets and observability, team products, technical tests, this portfolio and personal repositories.",
            },
        },
    },
    languages: {
        title: "Hours versus commits",
        note: "Each language's share of the GitHub commits and of the {hours} hours WakaTime tracked in my editors.",
        byCommits: "commits",
        byHours: "hours",
        why: "They measure different things. The count by language assigns each commit to its repository's main language, and a change applied to the whole landing page fleet adds one commit per repository, almost all of them TypeScript. WakaTime measures time in the editor, where the Python services and notebooks weigh the most.",
    },
    years: {
        title: "Year by year",
        note: "Contributions each year and the days with at least one.",
        activeDays: "{active} of {days} days active",
        partial: "through {date}",
    },
    habits: {
        weekdaysTitle: "Contributions by day of the week",
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        editorsTitle: "Editors (WakaTime)",
        reviews: "Of the {reviews} pull requests I reviewed, {dependabot} were dependency updates opened by Dependabot.",
        repositories: "{contributed} repositories with commits of mine, {private} of them private.",
        more: "{created} repositories created and {issues} issues opened since February 2022.",
    },
    load: "Load the detailed GitHub cards",
    imagesTitle: "Detailed cards",
    imageAlts: {
        streak: "Streak card with total contributions, current streak and longest streak",
        stats: "GitHub stats card with commits, pull requests, issues and rank",
        activity: "Contributions per day over the last 50 days",
        wakatime: "Coding time per language from WakaTime",
        topLangs: "Most used languages by code size across repositories",
        account: "GitHub account summary with activity, community and repositories",
        languages: "Most used languages by lines of code",
        calendar: "Contributions calendar and commit streaks",
        followup: "Status of issues and pull requests",
    },
};
