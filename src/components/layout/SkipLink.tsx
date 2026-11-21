import {useContent} from "@/context/language";

export function SkipLink() {
    const {ui} = useContent();
    return (
        <a href="#main" data-testid="skip-link" class="skip-link">
            {ui.skipLink}
        </a>
    );
}
