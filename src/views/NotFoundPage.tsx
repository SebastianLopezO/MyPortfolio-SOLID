import {For} from "solid-js";
import {notFoundCopy} from "@/content/shared/not-found";
import {withBase} from "@/lib/base";
import {buildPath, LANGS} from "@/lib/paths";

export function NotFoundPage() {
    return (
        <main id="main" class="hero-backdrop grid min-h-dvh place-items-center px-4 py-24">
            <div class="max-w-xl text-center">
                <p class="font-display text-display text-gradient">404</p>
                <For each={LANGS}>
                    {(lang) => (
                        <section lang={lang} class="mt-8">
                            <h1 class="text-title text-fg">{notFoundCopy[lang].title}</h1>
                            <p class="mt-2 text-fg-muted">{notFoundCopy[lang].description}</p>
                            <a
                                href={withBase(buildPath(lang, null))}
                                hreflang={lang}
                                class="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
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
