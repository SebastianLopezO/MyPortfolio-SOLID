import {profile} from "@/content/shared/profile";
import {useContent} from "@/context/language";
import {WhatsappIcon} from "@/components/layout/BrandIcons";

export function WhatsAppButton() {
    const {ui} = useContent();
    const href = `https://wa.me/${profile.phone.whatsapp}?text=${encodeURIComponent(ui.whatsapp.message)}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="floating-whatsapp"
            aria-label={ui.whatsapp.label}
            title={ui.whatsapp.label}
            class="floating-action fixed right-16 bottom-3 z-40 grid size-11 place-items-center rounded-full bg-whatsapp text-on-whatsapp shadow-card hover:scale-105 md:right-5 md:bottom-20 md:size-12"
        >
            <WhatsappIcon class="size-5 md:size-6"/>
        </a>
    );
}
