import {createSignal, For, onCleanup, onMount, Show} from "solid-js";
import {Dynamic} from "solid-js/web";
import {Check, Copy, Mail, MapPin, Phone, Send} from "@/components/ui/icons";
import {forProfile} from "@/content/roles";
import {profile} from "@/content/shared/profile";
import {useSectionCopy} from "@/content/sections";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";
import {LinkedinIcon} from "@/components/layout/BrandIcons";
import {Section} from "@/components/layout/Section";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {mailtoUrl, whatsappUrl} from "@/lib/contact";

export function ContactSection() {
    const {hero} = useContent();
    const contact = useSectionCopy("contact");
    const {role} = useRole();
    const [form, setForm] = createSignal({name: "", email: "", message: ""});
    const [copied, setCopied] = createSignal<"done" | "failed" | null>(null);

    // Flags the page while this section is on screen, so the floating buttons stop covering the form (globals.css).
    onMount(() => {
        const section = document.getElementById("contact");
        if (!section || !("IntersectionObserver" in window)) return;
        const root = document.documentElement;
        const observer = new IntersectionObserver(([entry]) => root.toggleAttribute("data-contact-visible", entry.isIntersecting));
        observer.observe(section);
        onCleanup(() => {
            observer.disconnect();
            root.removeAttribute("data-contact-visible");
        });
    });

    // Both buttons submit the form, so the browser checks the required fields before either app opens.
    const submit = (event: SubmitEvent) => {
        event.preventDefault();
        if (event.submitter?.getAttribute("value") === "email") {
            window.location.href = mailtoUrl(contact.emailSubject, form());
        } else {
            window.open(whatsappUrl(contact.whatsappIntro, form()), "_blank", "noopener,noreferrer");
        }
    };
    const update = (field: "name" | "email" | "message") => (event: InputEvent & {
        currentTarget: HTMLInputElement | HTMLTextAreaElement
    }) =>
        setForm((current) => ({...current, [field]: event.currentTarget.value}));

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied("done");
        } catch {
            setCopied("failed");
        }
    };

    const copiedLabel = () => {
        const state = copied();
        return state ? contact.copyEmail[state] : "";
    };

    // On a phone the address wraps at the @ instead of mid-word.
    const [mailbox, domain] = profile.email.split("@");
    const details = [
        {icon: MapPin, label: contact.labels.location, value: hero.location},
        {icon: Phone, label: contact.labels.phone, value: profile.phone.display, href: `tel:${profile.phone.e164}`},
        {
            icon: Mail,
            label: contact.labels.email,
            value: <>{mailbox}
                <wbr/>
                @{domain}</>,
            href: `mailto:${profile.email}`,
            copy: true
        },
        {icon: LinkedinIcon, label: contact.labels.linkedin, value: "sebastianlopezosorno", href: profile.linkedin},
    ];

    return (
        // The ways to reach me sit under the title, and the form beside them starts level with the title.
        <Section id="contact" title={contact.title} subtitle={forProfile(contact.subtitle, role())} tone="raised"
                 layout="pair" intro={
            <div class="mt-10">
                <h3 class="text-title text-fg">{contact.connect}</h3>
                <p class="mt-3 text-fg-muted">{contact.description}</p>
                <ul data-testid="contact-details" class="mt-8 space-y-5">
                    <For each={details}>{(detail) => (
                        <li class="flex items-center gap-4">
                            <span
                                class="grid size-11 shrink-0 place-items-center rounded-md border border-border bg-surface text-primary">
                                <Dynamic component={detail.icon} class="size-5"/>
                            </span>
                            <div class="min-w-0">
                                <p class="text-sm text-fg-subtle">{detail.label}</p>
                                <p class="wrap-anywhere text-fg">
                                    <Show when={detail.href} fallback={detail.value}>
                                        {(href) => (
                                            <a href={href()} class="hover:text-primary"
                                               data-testid={detail.copy ? "contact-email-link" : undefined}
                                               target={href().startsWith("http") ? "_blank" : undefined}
                                               rel={href().startsWith("http") ? "noopener noreferrer" : undefined}>
                                                {detail.value}
                                            </a>
                                        )}
                                    </Show>
                                </p>
                                <Show when={detail.copy}>
                                    <p role="status" data-testid="contact-copy-status" class="text-sm text-fg-subtle">{copiedLabel()}</p>
                                </Show>
                            </div>
                            <Show when={detail.copy}>
                                <button
                                    type="button"
                                    data-testid="contact-copy-email"
                                    onClick={copyEmail}
                                    aria-label={contact.copyEmail.label}
                                    title={contact.copyEmail.label}
                                    class="grid size-11 shrink-0 place-items-center rounded-md border border-border text-fg-muted transition-colors hover:border-primary hover:text-primary"
                                >
                                    <Show when={copied() === "done"} fallback={<Copy class="size-5"/>}>
                                        <Check class="size-5"/>
                                    </Show>
                                </button>
                            </Show>
                        </li>
                    )}</For>
                </ul>
            </div>
        }>
            <form onSubmit={submit}
                  aria-labelledby="contact-title"
                  data-testid="contact-form"
                  class="space-y-5 rounded-lg border border-border bg-surface p-6 shadow-card">
                <div>
                    <label for="contact-name"
                           class="mb-2 block text-sm font-semibold text-fg">{contact.form.name}</label>
                    <Input id="contact-name" data-testid="contact-name-input" name="name" autocomplete="name" required value={form().name}
                           placeholder={contact.placeholders.name}
                           onInput={update("name")}/>
                </div>
                <div>
                    <label for="contact-email"
                           class="mb-2 block text-sm font-semibold text-fg">{contact.form.email}</label>
                    <Input id="contact-email" data-testid="contact-email-input" name="email" type="email" autocomplete="email" spellcheck={false}
                           required value={form().email}
                           placeholder={contact.placeholders.email}
                           onInput={update("email")}/>
                </div>
                <div>
                    <label for="contact-message"
                           class="mb-2 block text-sm font-semibold text-fg">{contact.form.message}</label>
                    <Textarea id="contact-message" data-testid="contact-message-input" name="message" rows={5} required prop:value={form().message}
                              placeholder={contact.placeholders.message}
                              onInput={update("message")}/>
                </div>
                {/* Side by side only when both labels fit whole; otherwise each button takes its own row. */}
                <div class="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        name="channel"
                        value="whatsapp"
                        data-testid="contact-submit-whatsapp"
                        class="inline-flex h-12 flex-auto items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold whitespace-nowrap text-on-primary hover:bg-primary-hover active:translate-y-px"
                    >
                        <Send class="size-5"/>
                        {contact.form.send}
                    </button>
                    <button
                        type="submit"
                        name="channel"
                        value="email"
                        data-testid="contact-submit-email"
                        class="inline-flex h-12 flex-auto items-center justify-center gap-2 rounded-full border border-border-strong px-5 font-semibold whitespace-nowrap text-fg transition-colors hover:border-primary hover:text-primary active:translate-y-px"
                    >
                        <Mail class="size-5"/>
                        {contact.form.sendEmail}
                    </button>
                </div>
                <p data-testid="contact-form-note" class="text-center text-xs text-fg-subtle">{contact.form.note}</p>
            </form>
        </Section>
    );
}
