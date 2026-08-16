"use client";

import { ArrowRight, Smartphone } from "lucide-react";
import Container from "@/components/layout/Container";
import AppDownloadBadges from "@/components/ui/AppDownloadBadges";
import { APP_DOWNLOAD_URL } from "@/config/links";
import { SITE } from "@/config/site";
import { capturePostHogEvent } from "@/components/analytics/PostHogPageView";

const copyByLocale: Record<string, { kicker: string; title: string; desc: string; button: string }> = {
  en: { kicker: "MultiMe AI App", title: "Download the app to continue faster", desc: "Voice Hub, chat, translation, and secure service steps stay in one place.", button: "Download app" },
  fr: { kicker: "Application MultiMe AI", title: "Téléchargez l'application pour continuer plus vite", desc: "Voice Hub, chat, traduction et suivi des services restent au même endroit.", button: "Télécharger l'app" },
  de: { kicker: "MultiMe AI App", title: "App herunterladen und schneller weitermachen", desc: "Voice Hub, Chat, Übersetzung und sichere Serviceschritte bleiben an einem Ort.", button: "App herunterladen" },
  es: { kicker: "App MultiMe AI", title: "Descarga la app para continuar más rápido", desc: "Voice Hub, chat, traducción y pasos seguros del servicio en un solo lugar.", button: "Descargar app" },
  pt: { kicker: "App MultiMe AI", title: "Baixe o app para continuar mais rápido", desc: "Voice Hub, chat, tradução e etapas seguras do serviço ficam em um só lugar.", button: "Baixar app" },
  ar: { kicker: "تطبيق MultiMe AI", title: "حمّل التطبيق للمتابعة بشكل أسرع", desc: "‏Voice Hub والدردشة والترجمة وخطوات الخدمة الآمنة في مكان واحد.", button: "تحميل التطبيق" },
  bn: { kicker: "MultiMe AI অ্যাপ", title: "আরও দ্রুত এগিয়ে যেতে অ্যাপটি ডাউনলোড করুন", desc: "Voice Hub, চ্যাট, অনুবাদ এবং নিরাপদ সার্ভিস ধাপ এক জায়গাতেই।", button: "অ্যাপ ডাউনলোড করুন" },
  zh: { kicker: "MultiMe AI 应用", title: "下载应用，更快继续", desc: "Voice Hub、聊天、翻译和安全的服务流程都在一处。", button: "下载应用" },
  ja: { kicker: "MultiMe AI アプリ", title: "アプリをダウンロードしてスムーズに続行", desc: "Voice Hub、チャット、翻訳、安全なサービス手順がひとつの場所に。", button: "アプリをダウンロード" },
  ko: { kicker: "MultiMe AI 앱", title: "앱을 다운로드하고 더 빠르게 진행하세요", desc: "Voice Hub, 채팅, 번역, 안전한 서비스 단계가 한곳에 모여 있습니다.", button: "앱 다운로드" },
  id: { kicker: "Aplikasi MultiMe AI", title: "Unduh aplikasi untuk lanjut lebih cepat", desc: "Voice Hub, chat, terjemahan, dan langkah layanan aman ada di satu tempat.", button: "Unduh aplikasi" },
  fil: { kicker: "MultiMe AI App", title: "I-download ang app para mas mabilis magpatuloy", desc: "Voice Hub, chat, translation, at secure service steps sa iisang lugar.", button: "I-download ang app" },
  pl: { kicker: "Aplikacja MultiMe AI", title: "Pobierz aplikację i kontynuuj szybciej", desc: "Voice Hub, czat, tłumaczenia i bezpieczne kroki usługi w jednym miejscu.", button: "Pobierz aplikację" },
  sv: { kicker: "MultiMe AI-appen", title: "Ladda ner appen och fortsätt snabbare", desc: "Voice Hub, chatt, översättning och säkra servicesteg finns på ett ställe.", button: "Ladda ner appen" },
  it: { kicker: "App MultiMe AI", title: "Scarica l'app e continua più velocemente", desc: "Voice Hub, chat, traduzione e passaggi sicuri del servizio restano in un unico posto.", button: "Scarica l'app" },
  hi: { kicker: "MultiMe AI ऐप", title: "तेज़ी से आगे बढ़ने के लिए ऐप डाउनलोड करें", desc: "Voice Hub, चैट, अनुवाद और सुरक्षित सर्विस स्टेप्स एक ही जगह पर।", button: "ऐप डाउनलोड करें" },
  ru: { kicker: "Приложение MultiMe AI", title: "Скачайте приложение и продолжайте быстрее", desc: "Voice Hub, чат, перевод и безопасные шаги услуги — в одном месте.", button: "Скачать приложение" },
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
