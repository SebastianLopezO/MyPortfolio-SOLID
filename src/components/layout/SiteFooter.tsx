import {For} from "solid-js";
import {Mail, Phone} from "@/components/ui/icons";
import {DETAIL_COLLECTIONS} from "@/content/shared/detail-links";
import {profile, socialLinks} from "@/content/shared/profile";
import {BUILD_YEAR} from "@/content/shared/site";
import {useLanguage} from "@/context/language";
import {GithubIcon, LinkedinIcon} from "@/components/layout/BrandIcons";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {Link} from "@/routes/Router";

export function SiteFooter() {
    const {lang, content: {ui}} = useLanguage();
    const pages = [
        {key: "projects" as const, to: buildProjectPath(lang)},
        ...DETAIL_COLLECTIONS.map((collection) => ({key: collection, to: buildDetailPath(lang, collection)})),
    ];

    return (
        <footer data-testid="site-footer" class="border-t border-border bg-surface/60 py-12">
            <div class="container-page grid gap-10 md:grid-cols-[1fr_2fr]">
                <div>
                    <p data-testid="footer-brand" class="font-display text-2xl text-fg">{profile.name}</p>
                    <p class="mt-2 text-sm text-fg-subtle">{ui.footer.builtWith}</p>
                    <ul data-testid="footer-direct-links" class="mt-6 flex gap-3">
                        <li>
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                               data-testid="footer-social-github"
                               class="grid size-10 place-items-center rounded-md border border-border text-fg-muted hover:border-primary hover:text-primary">
                                <GithubIcon class="size-5"/>
                            </a>
                        </li>
                        <li>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                               data-testid="footer-social-linkedin"
                               class="grid size-10 place-items-center rounded-md border border-border text-fg-muted hover:border-primary hover:text-primary">
                                <LinkedinIcon class="size-5"/>
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${profile.email}`} aria-label={profile.email}
                               data-testid="footer-social-email"
                               class="grid size-10 place-items-center rounded-md border border-border text-fg-muted hover:border-primary hover:text-primary">
                                <Mail class="size-5"/>
                            </a>
                        </li>
                        <li>
                            <a href={`tel:${profile.phone.e164}`} aria-label={profile.phone.display}
                               data-testid="footer-social-phone"
                               class="grid size-10 place-items-center rounded-md border border-border text-fg-muted hover:border-primary hover:text-primary">
                                <Phone class="size-5"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <nav aria-label={ui.footer.explore} data-testid="footer-explore-nav">
                        <p class="font-mono text-xs text-fg-subtle">{ui.footer.explore}</p>
                        <ul class="mt-4 mb-8 flex flex-wrap gap-2">
                            <For each={pages}>{(page) => (
                                <li>
                                    <Link
                                        to={page.to}
                                        data-testid={`footer-explore-${page.key}`}
                                        class="inline-flex min-h-9 items-center rounded-full border border-border px-4 text-sm text-fg-muted transition-colors hover:border-primary hover:text-primary"
                                    >
                                        {ui.footer.pages[page.key]}
                                    </Link>
                                </li>
                            )}</For>
                        </ul>
                    </nav>
                    <p class="font-mono text-xs text-fg-subtle">{ui.footer.elsewhere}</p>
                    <ul translate="no" data-testid="footer-elsewhere-list" class="mt-4 flex flex-wrap gap-2">
                        <For each={socialLinks}>{(link) => (
                            <li>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid={`footer-elsewhere-${link.id}`}
                                    class="inline-flex min-h-9 items-center rounded-full border border-border px-4 text-sm text-fg-muted transition-colors hover:border-primary hover:text-primary"
                                >
                                    {link.label}
                                </a>
                            </li>
                        )}</For>
                    </ul>
                </div>
            </div>
            <p data-testid="footer-copyright" class="container-page mt-10 text-sm text-fg-subtle">
                © {BUILD_YEAR} {profile.name}. {ui.footer.rights}
            </p>
        </footer>
    );
}
