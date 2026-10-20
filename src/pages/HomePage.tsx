import {createMemo, createRenderEffect, For} from "solid-js";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";
import {useDocumentHead} from "@/hooks/useDocumentHead";
import {buildHead} from "@/lib/seo";
import {expectSections} from "@/lib/ready";
import {AssistantLauncher} from "@/components/assistant/AssistantLauncher";
import {SiteFooter} from "@/components/layout/SiteFooter";
import {SiteHeader} from "@/components/layout/SiteHeader";
import {SkipLink} from "@/components/layout/SkipLink";
import {WhatsAppButton} from "@/components/layout/WhatsAppButton";
import {HeroSection} from "@/components/sections/HeroSection";
import {HighlightsStrip} from "@/components/sections/HighlightsStrip";
import {SectionSlot} from "@/components/sections/SectionSlot";
import {sectionOrder} from "@/lib/role-view";

export function HomePage() {
    const content = useContent();
    const {role} = useRole();
    const order = createMemo(() => sectionOrder(role()));
    useDocumentHead(() => buildHead(content, role()));
    // Before any effect runs, so the page is not marked hydrated while its sections are still on their way.
    createRenderEffect(() => expectSections(order()));

    return (
        <>
            <SkipLink/>
            <SiteHeader sections={order()}/>
            <main id="main">
                <HeroSection/>
                <HighlightsStrip/>
                <For each={order()}>{(id) => <SectionSlot id={id}/>}</For>
            </main>
            <SiteFooter/>
            <WhatsAppButton/>
            <AssistantLauncher/>
        </>
    );
}
