import React from "react";
import { SITE } from "@/config/site";

type CountryIntroBadgeProps = {
  brandClassName?: string;
};

/** Localized “in {country}” fragment for intro line */
function inCountry(lang: string, country: string): string {
  if (lang === "de") {
    if (country === "Schweiz") return "in der Schweiz";
    if (country === "Österreich") return "in Österreich";
    return `in ${country}`;
  }
  if (lang === "fr") {
    if (country === "Maroc") return "au Maroc";
    if (country === "France") return "en France";
    if (country === "Belgique") return "en Belgique";
    return `en ${country}`;
  }
  if (lang === "pt") {
    if (country === "Brasil") return "no Brasil";
    return `em ${country}`;
  }
  if (lang === "es" || lang === "it") return `en ${country}`;
  if (lang === "zh") return `在${country}`;
  if (lang === "rn") return `muri ${country}`;
  return `in ${country}`;
}

function introCopy(brand: React.ReactNode) {
  const lang = SITE.language as string;
  const country = SITE.country;
  const where = inCountry(lang, country);
  const locale = String("locale" in SITE ? SITE.locale : "");
  const isZhTw = lang === "zh" && locale.includes("TW");

  switch (lang) {
    case "es":
      return <>Nos complace presentar {brand} {where}</>;
    case "fr":
      return <>Nous avons le plaisir de vous présenter {brand} {where}</>;
    case "de":
      return <>Wir freuen uns, {brand} {where} vorstellen zu dürfen</>;
    case "it":
      return <>Siamo lieti di presentare {brand} {where}</>;
    case "pt":
      return <>Temos o prazer de apresentar {brand} {where}</>;
    case "fil":
      return <>Malugod naming ipinakikilala ang {brand} sa {country}</>;
    case "zh":
      return isZhTw ? (
        <>我們謹此向您介紹 {brand}（{country}）</>
      ) : (
        <>我们谨此向您介绍 {brand}（{country}）</>
      );
    case "rn":
      return <>Turishimira kw&apos;ishimangira gushikiriza {brand} {where}</>;
    default:
      return <>We are pleased to introduce {brand} {where}</>;
  }
}

/** Hero pill: polite country intro — “We are pleased to introduce strongbody.ai in {country}”. */
export function CountryIntroBadge({ brandClassName = "" }: CountryIntroBadgeProps) {
  const brand = (
    <span
      className={["notranslate", brandClassName].filter(Boolean).join(" ")}
      translate="no"
    >
      strongbody.ai
    </span>
  );

  return <>{introCopy(brand)}</>;
}
