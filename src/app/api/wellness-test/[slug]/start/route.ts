import { NextResponse } from "next/server";

const PUBLIC_BASE_PATH = "/v1/public/wellness-test";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function getApiBaseUrl() {
  const value =
    process.env.STRONGBODY_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api-v2.strongbody.ai";
  return value.replace(/\/$/, "").replace(/\/v1\/public$/, "");
}

function getApiKey() {
  return process.env.STRONGBODY_API_KEY || process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || "your_api_key";
}

function getLanguage() {
  return process.env.API_LANGUAGE || process.env.NEXT_PUBLIC_API_LANGUAGE || "en";
}

export async function POST(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const upstream = await fetch(
    getApiBaseUrl() + PUBLIC_BASE_PATH + "/topic/" + encodeURIComponent(slug) + "/start",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Scope: "strongbody-ai",
        language: getLanguage(),
        "x-api-key": getApiKey(),
      },
      cache: "no-store",
    },
  );

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") || "application/json" },
  });
}
