import {For} from "solid-js";
import {notFoundCopy} from "@/content/shared/not-found";
import {withBase} from "@/lib/base";
import {buildPath, LANGS} from "@/lib/paths";

export function NotFoundPage() {
    return (
        <main id="main" data-testid="not-found-main" class="hero-backdrop grid min-h-dvh place-items-center px-4 py-24">
            <div class="max-w-xl text-center">
                <p data-testid="not-found-code" class="font-display text-display text-fg">404</p>
                <For each={LANGS}>
                    {(lang) => (
                        <section lang={lang} data-testid={`not-found-section-${lang}`} aria-label={notFoundCopy[lang].title} class="mt-8">
                            <h1 data-testid={`not-found-title-${lang}`} class="text-title text-fg">{notFoundCopy[lang].title}</h1>
                            <p data-testid={`not-found-description-${lang}`} class="mt-2 text-fg-muted">{notFoundCopy[lang].description}</p>
                            <a
                                href={withBase(buildPath(lang, null))}
                                hreflang={lang}
                                data-testid={`not-found-home-${lang}`}
                                class="mt-4 inline-flex h-11 items-center rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
                            >
                                {notFoundCopy[lang].home}
                            </a>
                        </section>
                    )}
                </For>
            </div>
        </main>
    );
}
