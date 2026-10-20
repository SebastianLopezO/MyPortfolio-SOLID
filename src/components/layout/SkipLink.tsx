import {useContent} from "@/context/language";

export function SkipLink() {
    const {ui} = useContent();
    return (
        <a href="#main" class="skip-link">
            {ui.skipLink}
        </a>
    );
}
