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
            aria-label={ui.whatsapp.label}
            title={ui.whatsapp.label}
            class="floating-action fixed right-5 bottom-24 z-40 grid size-12 place-items-center rounded-full bg-whatsapp text-on-whatsapp shadow-card hover:scale-105"
        >
            <WhatsappIcon class="size-6"/>
        </a>
    );
}
