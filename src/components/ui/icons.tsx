import type {JSX} from "solid-js";

/*
 * The Lucide icons the site uses (lucide.dev, v1.58.0, ISC license: Copyright (c) for portions of Lucide are held by
 * Cole Bemis 2013-2022 as part of Feather (MIT); all other copyright (c) for Lucide are held by Lucide Contributors
 * 2022). They are drawn here instead of imported from a package: the site needs about thirty, always decorative, so
 * each is one static template and the page carries no icon runtime. Add a new one by copying its path data from
 * lucide.dev.
 */

export interface IconProps {
    class?: string;
}

/** Every icon is decorative: the control or text next to it carries the name, so it is hidden from assistive tech. */
function Icon(props: { name: string; class?: string; children: JSX.Element }) {
    // A name may carry Lucide's alias classes after it, as "folder-git2 lucide-folder-git-2" does.
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class={`lucide lucide-${props.name}${props.class ? ` ${props.class}` : ""}`}
            aria-hidden="true"
        >
            {props.children}
        </svg>
    );
}

export const ArrowDownUp = (props: IconProps) => (
    <Icon name="arrow-down-up" class={props.class}>
        <path d="m3 16 4 4 4-4"/>
        <path d="M7 20V4"/>
        <path d="m21 8-4-4-4 4"/>
        <path d="M17 4v16"/>
    </Icon>
);

export const ArrowLeft = (props: IconProps) => (
    <Icon name="arrow-left" class={props.class}>
        <path d="m12 19-7-7 7-7"/>
        <path d="M19 12H5"/>
    </Icon>
);

export const ArrowLeftRight = (props: IconProps) => (
    <Icon name="arrow-left-right" class={props.class}>
        <path d="M8 3 4 7l4 4"/>
        <path d="M4 7h16"/>
        <path d="m16 21 4-4-4-4"/>
        <path d="M20 17H4"/>
    </Icon>
);

export const ArrowRight = (props: IconProps) => (
    <Icon name="arrow-right" class={props.class}>
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
    </Icon>
);

export const ArrowUpRight = (props: IconProps) => (
    <Icon name="arrow-up-right" class={props.class}>
        <path d="M7 7h10v10"/>
        <path d="M7 17 17 7"/>
    </Icon>
);

export const Award = (props: IconProps) => (
    <Icon name="award" class={props.class}>
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
        <circle cx="12" cy="8" r="6"/>
    </Icon>
);

export const BookOpen = (props: IconProps) => (
    <Icon name="book-open" class={props.class}>
        <path d="M12 5v16"/>
        <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>
    </Icon>
);

export const Briefcase = (props: IconProps) => (
    <Icon name="briefcase" class={props.class}>
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        <rect width="20" height="14" x="2" y="6" rx="2"/>
    </Icon>
);

export const Check = (props: IconProps) => (
    <Icon name="check" class={props.class}>
        <path d="M20 6 9 17l-5-5"/>
    </Icon>
);

export const ChevronDown = (props: IconProps) => (
    <Icon name="chevron-down" class={props.class}>
        <path d="m6 9 6 6 6-6"/>
    </Icon>
);

export const ChevronLeft = (props: IconProps) => (
    <Icon name="chevron-left" class={props.class}>
        <path d="m15 18-6-6 6-6"/>
    </Icon>
);

export const ChevronRight = (props: IconProps) => (
    <Icon name="chevron-right" class={props.class}>
        <path d="m9 18 6-6-6-6"/>
    </Icon>
);

export const Copy = (props: IconProps) => (
    <Icon name="copy" class={props.class}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </Icon>
);

export const Download = (props: IconProps) => (
    <Icon name="download" class={props.class}>
        <path d="M12 15V3"/>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <path d="m7 10 5 5 5-5"/>
    </Icon>
);

export const ExternalLink = (props: IconProps) => (
    <Icon name="external-link" class={props.class}>
        <path d="M15 3h6v6"/>
        <path d="M10 14 21 3"/>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </Icon>
);

export const FileText = (props: IconProps) => (
    <Icon name="file-text" class={props.class}>
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
        <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
        <path d="M10 9H8"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
    </Icon>
);

export const Flag = (props: IconProps) => (
    <Icon name="flag" class={props.class}>
        <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>
    </Icon>
);

export const FolderGit2 = (props: IconProps) => (
    <Icon name="folder-git2 lucide-folder-git-2" class={props.class}>
        <path d="M18 19a5 5 0 0 1-5-5v8"/>
        <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/>
        <circle cx="13" cy="12" r="2"/>
        <circle cx="20" cy="19" r="2"/>
    </Icon>
);

export const GraduationCap = (props: IconProps) => (
    <Icon name="graduation-cap" class={props.class}>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
        <path d="M22 10v6"/>
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
    </Icon>
);

export const Languages = (props: IconProps) => (
    <Icon name="languages" class={props.class}>
        <path d="m5 8 6 6"/>
        <path d="m4 14 6-6 2-3"/>
        <path d="M2 5h12"/>
        <path d="M7 2h1"/>
        <path d="m22 22-5-10-5 10"/>
        <path d="M14 18h6"/>
    </Icon>
);

export const Lock = (props: IconProps) => (
    <Icon name="lock" class={props.class}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </Icon>
);

export const Mail = (props: IconProps) => (
    <Icon name="mail" class={props.class}>
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
        <rect x="2" y="4" width="20" height="16" rx="2"/>
    </Icon>
);

export const MapPin = (props: IconProps) => (
    <Icon name="map-pin" class={props.class}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3"/>
    </Icon>
);

export const Menu = (props: IconProps) => (
    <Icon name="menu" class={props.class}>
        <path d="M4 5h16"/>
        <path d="M4 12h16"/>
        <path d="M4 19h16"/>
    </Icon>
);

export const MessageCircleQuestionMark = (props: IconProps) => (
    <Icon name="message-circle-question-mark" class={props.class}>
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
    </Icon>
);

export const Phone = (props: IconProps) => (
    <Icon name="phone" class={props.class}>
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
    </Icon>
);

export const Quote = (props: IconProps) => (
    <Icon name="quote" class={props.class}>
        <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>
        <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>
    </Icon>
);

export const Send = (props: IconProps) => (
    <Icon name="send" class={props.class}>
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
        <path d="m21.854 2.147-10.94 10.939"/>
    </Icon>
);

export const SendHorizontal = (props: IconProps) => (
    <Icon name="send-horizontal" class={props.class}>
        <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/>
        <path d="M6 12h16"/>
    </Icon>
);

export const Star = (props: IconProps) => (
    <Icon name="star" class={props.class}>
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
    </Icon>
);

export const X = (props: IconProps) => (
    <Icon name="x" class={props.class}>
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
    </Icon>
);
