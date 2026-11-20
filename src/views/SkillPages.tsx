import {createMemo, For, Show} from "solid-js";
import {ArrowRight, Check} from "@/components/ui/icons";
import {ArtTile} from "@/components/ui/ArtTile";
import {LinkRows, NeighborNavigation, TextSection} from "@/components/page/PageParts";
import {useDetailCopy} from "@/content/detail-copy";
import {ROLE_IDS, roleConfig} from "@/content/roles";
import {useSectionCopy} from "@/content/sections";
import {
    CERTIFICATION_SLUG,
    EXPERIENCE_SLUG,
    SERVICE_SLUG,
    SKILL_SLUG
} from "@/content/shared/detail-links";
import {EXPERIENCE_ART, SERVICE_ART} from "@/content/shared/page-art";
import {SKILL_ART} from "@/content/shared/skill-art";
import {SKILL_IDS, skillWork} from "@/content/shared/skills";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {
    certificationById,
    educationById,
    experienceById,
    neighbors,
    projectById,
    skillBySlug,
    skillGroupById,
    toolsOfGroupIn
} from "@/lib/details";
import {formatYearMonth} from "@/lib/format";
import {isFocusTech, orderSkillGroups, orderTech} from "@/lib/role-view";
import {withBase} from "@/lib/base";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {SkillGroupId} from "@/types/content";
import {
    ArtRows,
    countOf,
    DetailArticle,
    Glance,
    IndexHeader,
    ProgramTiles,
    ProjectTiles,
    TileGrid,
    useLinks
} from "@/views/detail-kit";

// The pages of the technical skills: every group of tools with an index and a page of its own, which says what I aim
// at with it, what it is, what it is good for, and where it shows in the projects, the jobs, the studies and the
// services.

/** How many tools the index names under each group; its page lists them all. */
const NAMED = 5;

/** The role views that list a group among their first four, the ones it matters most to. */
const rolesOf = (id: SkillGroupId) => ROLE_IDS.filter((role) => roleConfig(role).skillGroupOrder.indexOf(id) < 4);

/** A group's tools as chips; in a role view its own come first and stand out. */
function ToolChips(props: { items: readonly string[] }) {
    const {role} = useRole();
    return (
        <ul translate="no" class="enter-each flex flex-wrap gap-1.5">
            <For each={orderTech(props.items, role())}>{(item) => (
                <li class={cn(
                    "rounded-full px-3 py-1 font-mono text-sm",
                    !role() || isFocusTech(item, role()) ? "bg-surface-raised text-fg" : "text-fg-subtle ring-1 ring-border ring-inset",
                )}>
                    {item}
                </li>
            )}</For>
        </ul>
    );
}

/** Every group by its object, its name, its line and its first tools; each leads to its page. */
export function SkillsIndex() {
    const {role} = useRole();
    const {ui} = useDetailCopy();
    const skills = useSectionCopy("skills");
    const links = useLinks();
    const ordered = createMemo(() => orderSkillGroups(SKILL_IDS.map(skillGroupById), role()));

    return (
        <div class="container-page py-12 md:py-16">
            <IndexHeader collection="skills"/>
            <ul class="enter-each mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
                <For each={ordered()}>{(group) => (
                    <li>
                        <Link to={links.detail("skills", SKILL_SLUG[group.id])}
                              class="service-entry group grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-7">
                            <span aria-hidden="true"
                                  class="service-icon grid aspect-square place-items-center rounded-3xl"
                                  style={{background: `var(--color-tile-${SKILL_ART[group.id].tile})`}}>
                                <img src={withBase(SKILL_ART[group.id].file)} alt="" width={128} height={128}
                                     loading="lazy" decoding="async" class="w-[78%]"/>
                            </span>
                            <span class="min-w-0">
                                <span class="block font-mono text-xs text-fg-subtle">
                                    {skills.count.replace("{count}", String(group.items.length))}
                                </span>
                                <h2 class="mt-2 text-title text-fg">{skills.groups[group.id]}</h2>
                                <span class="mt-1 block text-lg text-fg">{skills.taglines[group.id]}</span>
                                <span translate="no" class="mt-2 block font-mono text-sm text-fg-muted">
                                    {orderTech(group.items, role()).slice(0, NAMED).join(" · ")}
                                </span>
                                <span class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                                    {ui.actions.readPage}
                                    <ArrowRight class="service-arrow size-4"/>
                                </span>
                            </span>
                        </Link>
                    </li>
                )}</For>
            </ul>
        </div>
    );
}

export function SkillPage(props: { slug: string }) {
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const {content: {ui: siteUi}} = useLanguage();
    const {role, pathFor} = useRole();
    const {ui, skills: pages} = useDetailCopy();
    const skills = useSectionCopy("skills");
    const services = useSectionCopy("services");
    const jobs = useSectionCopy("experience");
    const links = useLinks();
    const id = skillBySlug(slug)!;
    const group = skillGroupById(id);
    const page = pages[id];
    const art = SKILL_ART[id];
    const work = skillWork[id];
    const projectsHere = work.projects.map(projectById);
    const jobsHere = work.experience.map(experienceById);
    const programsHere = work.education.map(educationById);
    const certificationsHere = work.certifications.map(certificationById);
    const roles = rolesOf(id);
    const {previous, next} = neighbors(SKILL_IDS, SKILL_IDS.indexOf(id));
    const studied = programsHere.length + certificationsHere.length > 0;
    const sections = [
        {id: "detail-focus", title: ui.sections.focus},
        {id: "detail-description", title: ui.sections.description},
        {id: "detail-uses", title: ui.sections.uses},
        {id: "detail-tools", title: ui.sections.tools},
        {id: "detail-projects", title: ui.sections.projects},
        ...(jobsHere.length > 0 ? [{id: "detail-jobs", title: ui.sections.jobs}] : []),
        ...(studied ? [{id: "detail-education", title: ui.sections.education}] : []),
        {id: "detail-services", title: ui.sections.services},
    ];
    const skillLink = (other: SkillGroupId) => ({
        to: links.detail("skills", SKILL_SLUG[other]),
        label: skills.groups[other]
    });

    return (
        <DetailArticle
            collection="skills"
            title={skills.groups[id]}
            subtitle={skills.taglines[id]}
            art={art}
            sections={sections}
            glance={
                <Glance items={[
                    {label: ui.facts.tools, value: skills.count.replace("{count}", String(group.items.length))},
                    ...(roles.length > 0
                        ? [{label: ui.facts.roles, value: roles.map((item) => siteUi.roleNames[item]).join(" · ")}]
                        : []),
                ]}>
                    <p class="text-fg-muted">
                        {countOf(ui.counts.projects, projectsHere.length)}
                        {jobsHere.length > 0 && ` · ${countOf(ui.counts.jobs, jobsHere.length)}`}
                        {programsHere.length > 0 && ` · ${countOf(ui.counts.programs, programsHere.length)}`}
                    </p>
                    <Link to={pathFor(role(), "contact")}
                          class="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary transition-colors hover:bg-primary-hover">
                        {ui.actions.talkSkill}
                        <ArrowRight class="size-4"/>
                    </Link>
                </Glance>
            }
            navigation={
                <NeighborNavigation
                    label={ui.all.skills}
                    previous={skillLink(previous)}
                    next={skillLink(next)}
                    previousLabel={ui.actions.previous}
                    nextLabel={ui.actions.next}
                    all={{to: links.detail("skills"), label: ui.all.skills}}
                />
            }
        >
            <TextSection id="detail-focus" title={ui.sections.focus}>
                <p class="max-w-[68ch] border-l-2 pl-5 text-xl leading-relaxed text-fg"
                   style={{"border-color": `var(--color-tile-${art.tile})`}}>
                    {page.focus}
                </p>
            </TextSection>
            <TextSection id="detail-description" title={ui.sections.description}>
                <div class="max-w-[68ch] space-y-4 text-lg text-fg-muted">
                    <For each={page.description}>{(paragraph) => <p>{paragraph}</p>}</For>
                </div>
            </TextSection>
            <TextSection id="detail-uses" title={ui.sections.uses}>
                <ul class="enter-each grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    <For each={page.uses}>{(use) => (
                        <li class="flex gap-3 text-fg">
                            <span aria-hidden="true"
                                  class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"
                                  style={{background: `var(--color-tile-${art.tile})`}}>
                                <Check class="size-3.5"/>
                            </span>
                            {use}
                        </li>
                    )}</For>
                </ul>
            </TextSection>
            <TextSection id="detail-tools" title={ui.sections.tools}>
                <ToolChips items={group.items}/>
            </TextSection>
            <TextSection id="detail-projects" title={ui.sections.projects}>
                <ProjectTiles items={projectsHere}/>
            </TextSection>
            <Show when={jobsHere.length > 0}>
                <TextSection id="detail-jobs" title={ui.sections.jobs}>
                    {/* Each job names the tools of this group it used, or its title when the group is a practice. */}
                    <TileGrid>
                        <For each={jobsHere}>{(job) => {
                            const used = toolsOfGroupIn(id, job.tech);
                            return (
                                <li>
                                    <ArtTile art={EXPERIENCE_ART[job.id]} name={job.company.split(" – ")[0]}
                                             brief={used.length > 0 ? used.slice(0, 4).join(" · ") : jobs.items[job.id].title.split(" · ")[0]}
                                             href={links.detail("experience", EXPERIENCE_SLUG[job.id])}/>
                                </li>
                            );
                        }}</For>
                    </TileGrid>
                </TextSection>
            </Show>
            <Show when={studied}>
                <TextSection id="detail-education" title={ui.sections.education}>
                    <Show when={programsHere.length > 0}>
                        <ProgramTiles items={programsHere}/>
                    </Show>
                    <Show when={certificationsHere.length > 0}>
                        <div class={programsHere.length > 0 ? "mt-6" : undefined}>
                            <LinkRows
                                items={certificationsHere.map((certification) => ({
                                    key: certification.id,
                                    to: links.detail("certifications", CERTIFICATION_SLUG[certification.id]),
                                    label: `${formatYearMonth(certification.date, siteUi.months)} · ${certification.issuer}`,
                                    name: certification.title,
                                }))}
                            />
                        </div>
                    </Show>
                </TextSection>
            </Show>
            <TextSection id="detail-services" title={ui.sections.services}>
                <ArtRows items={work.services.map((service) => ({
                    key: service,
                    art: SERVICE_ART[service],
                    to: links.detail("services", SERVICE_SLUG[service]),
                    name: services.items[service].title,
                    text: services.items[service].tagline,
                }))}/>
            </TextSection>
        </DetailArticle>
    );
}
