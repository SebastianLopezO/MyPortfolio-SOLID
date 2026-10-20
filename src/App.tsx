import {onMount} from "solid-js";
import {LanguageProvider} from "@/context/LanguageProvider";
import {markRootReady} from "@/lib/ready";
import {AppRoutes} from "@/routes/AppRoutes";
import type {StartupContent} from "@/types/content";

export default function App(props: { content: StartupContent }) {
    onMount(markRootReady);

    return (
        <LanguageProvider content={props.content}>
            <AppRoutes/>
        </LanguageProvider>
    );
}
