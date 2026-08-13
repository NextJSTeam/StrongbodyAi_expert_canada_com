"use client";

import { ArrowRight, Smartphone } from "lucide-react";
import Container from "@/components/layout/Container";
import AppDownloadBadges from "@/components/ui/AppDownloadBadges";
import { APP_DOWNLOAD_URL } from "@/config/links";
import { SITE } from "@/config/site";
import { capturePostHogEvent } from "@/components/analytics/PostHogPageView";

const copyByLocale: Record<string, { kicker: string; title: string; desc: string; button: string }> = {
  en: { kicker: "MultiMe AI App", title: "Download the app to continue faster", desc: "Voice Hub, chat, translation, and secure service steps stay in one place.", button: "Download app" },
  fr: { kicker: "Application MultiMe AI", title: "T?l?chargez l'application pour continuer plus vite", desc: "Voice Hub, chat, traduction et suivi des services restent au m?me endroit.", button: "T?l?charger l'app" },
  de: { kicker: "MultiMe AI App", title: "App herunterladen und schneller weitermachen", desc: "Voice Hub, Chat, ?bersetzung und sichere Serviceschritte bleiben an einem Ort.", button: "App herunterladen" },
  es: { kicker: "App MultiMe AI", title: "Descarga la app para continuar m?s r?pido", desc: "Voice Hub, chat, traducci?n y pasos seguros del servicio en un solo lugar.", button: "Descargar app" },
  pt: { kicker: "App MultiMe AI", title: "Baixe o app para continuar mais r?pido", desc: "Voice Hub, chat, tradu??o e etapas seguras do servi?o ficam em um s? lugar.", button: "Baixar app" },
  ar: { kicker: "????? MultiMe AI", title: "???? ??????? ???????? ?????", desc: "Voice Hub ???????? ???????? ?????? ?????? ?????? ?? ???? ????.", button: "????? ???????" },
  bn: { kicker: "MultiMe AI ?????", title: "??? ????? ????? ??????? ??????? ????", desc: "Voice Hub, ?????, ?????? ??? ?????? ??????? ??? ?? ?????? ?????", button: "????? ???????" },
  zh: { kicker: "MultiMe AI App", title: "???????????", desc: "Voice Hub????????????????????", button: "????" },
  ja: { kicker: "MultiMe AI???", title: "????????????????????", desc: "Voice Hub??????????????????????????????????", button: "??????????" },
  ko: { kicker: "MultiMe AI ?", title: "?? ?????? ? ??? ?????", desc: "Voice Hub, ??, ??, ??? ??? ??? ???? ?????.", button: "? ????" },
  id: { kicker: "Aplikasi MultiMe AI", title: "Unduh aplikasi untuk lanjut lebih cepat", desc: "Voice Hub, chat, terjemahan, dan langkah layanan aman ada di satu tempat.", button: "Unduh aplikasi" },
  fil: { kicker: "MultiMe AI App", title: "I-download ang app para mas mabilis magpatuloy", desc: "Voice Hub, chat, translation, at secure service steps sa iisang lugar.", button: "I-download ang app" },
  pl: { kicker: "Aplikacja MultiMe AI", title: "Pobierz aplikacj? i kontynuuj szybciej", desc: "Voice Hub, czat, t?umaczenia i bezpieczne kroki us?ugi w jednym miejscu.", button: "Pobierz aplikacj?" },
  sv: { kicker: "MultiMe AI App", title: "Ladda ner appen och forts?tt snabbare", desc: "Voice Hub, chatt, ?vers?ttning och s?kra servicesteg finns p? ett st?lle.", button: "Ladda ner appen" },
  it: { kicker: "App MultiMe AI", title: "Scarica l'app e continua pi? velocemente", desc: "Voice Hub, chat, traduzione e passaggi sicuri del servizio restano in un unico posto.", button: "Scarica l'app" },
  hi: { kicker: "MultiMe AI ??", title: "????? ?? ??? ????? ?? ??? ?? ??????? ????", desc: "Voice Hub, ???, ?????? ?? ???????? ???? ??? ?? ?? ??? ???? ????", button: "?? ??????? ????" },
  ru: { kicker: "MultiMe AI App", title: "???????? ?????????? ? ??????????? ???????", desc: "Voice Hub, ???, ??????? ? ?????????? ???? ?????? ???????? ? ????? ?????.", button: "??????? ??????????" },
};

function getCopy() {
  const locale = String(SITE.locale || SITE.language || "en").toLowerCase();
  return copyByLocale[locale] || copyByLocale[locale.split("-")[0]] || copyByLocale.en;
}

export default function AppDownloadStrip() {
  const copy = getCopy();

  return (
    <section id="download-app" className="border-y border-grey-200 bg-white py-10 md:py-12">
      <Container>
        <div className="flex flex-col gap-6 rounded-2xl border border-grey-200 bg-grey-50 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Smartphone size={14} aria-hidden />
              {copy.kicker}
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-grey-900 md:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-grey-600 md:text-base">
              {copy.desc}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 md:items-end">
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover"
            
                                onClick={() => capturePostHogEvent("app_download_click", { source: "app_download_link", destination: APP_DOWNLOAD_URL })}>
              {copy.button}
              <ArrowRight size={16} />
            </a>
            <AppDownloadBadges className="justify-center md:justify-end" size="sm" />
          </div>
        </div>
      </Container>
    </section>
  );
}
