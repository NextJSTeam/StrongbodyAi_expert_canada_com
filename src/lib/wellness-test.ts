export type WellnessQuestion = {
  id: number;
  order?: number;
  text: string;
  options: string[];
};

export type WellnessTopic = {
  id: number;
  slug: string;
  title: string;
  insight: string;
  category: string;
  durationSec?: number;
  questionCount?: number;
  questions?: WellnessQuestion[];
};

export type WellnessScore = {
  tag_name?: string;
  atomic_factor_name?: string;
  score?: number;
  level?: string;
  insight?: string;
};

export type WellnessCompleteResponse = {
  scores?: WellnessScore[];
  insight?: string;
  submission?: { id?: number };
  submission_id?: number;
};

export const WELLNESS_TEST_LANGUAGE = "en";
export const WELLNESS_TEST_LOCALE = "en";

const PUBLIC_BASE_PATH = "/v1/public/wellness-test";

function getApiBaseUrl() {
  const value = (
    process.env.STRONGBODY_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api-v2.strongbody.ai"
  ).replace(/\/$/, "");
  return value.replace(/\/v1\/public$/, "");
}

function getHeaders(): HeadersInit {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Scope: "strongbody-ai",
    language: WELLNESS_TEST_LANGUAGE,
    "x-api-key": process.env.STRONGBODY_API_KEY || process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || "your_api_key",
  };
}

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const text = query.toString();
  return text ? "?" + text : "";
}

async function parseResponse<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text) return null;
  const json = JSON.parse(text);
  if (json && typeof json === "object" && "code" in json && json.code !== 0) {
    throw new Error(json.message || "Wellness test API error");
  }
  if (!response.ok) throw new Error("HTTP " + response.status);
  return json?.data ?? json;
}

async function fetchLocalWellness<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  return parseResponse<T>(response);
}

async function fetchWellness<T>(path: string, options: RequestInit & { revalidate?: number | false } = {}) {
  const { revalidate = 300, ...fetchOptions } = options;
  const response = await fetch(getApiBaseUrl() + path, {
    ...fetchOptions,
    headers: {
      ...getHeaders(),
      ...(fetchOptions.headers || {}),
    },
    cache: revalidate === false ? "no-store" : "force-cache",
    next: revalidate === false ? undefined : { revalidate },
  });
  return parseResponse<T>(response);
}

function normalizeList<T>(payload: any): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  return [];
}

function firstText(values?: string[]) {
  return values?.find((value) => value && value.trim())?.trim() || "";
}

function mapQuestion(question: any): WellnessQuestion | null {
  const text = firstText(question.question_texts);
  if (!text) return null;
  return {
    id: question.id,
    order: question.order,
    text,
    options: (question.answer_options || [])
      .flatMap((option: any) => option.labels || [])
      .map((label: string) => String(label).trim())
      .filter(Boolean),
  };
}

function formatInsight(item: any) {
  return firstText(item?.insights) || item?.subtitle || "";
}

function mapListTopic(item: any): WellnessTopic {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    insight: formatInsight(item),
    category: item.tag_name || "Wellness",
    durationSec: item.duration_sec,
    questionCount: item.question_count,
  };
}

function mapDetail(detail: any): WellnessTopic | null {
  if (!detail?.topic?.slug) return null;
  const questions = (detail.questions || [])
    .map(mapQuestion)
    .filter(Boolean)
    .sort((a: WellnessQuestion, b: WellnessQuestion) => (a.order ?? 0) - (b.order ?? 0));
  return {
    id: detail.topic.id,
    slug: detail.topic.slug,
    title: detail.topic.title,
    insight: firstText(detail.version?.insights) || detail.version?.subtitle || "",
    category: detail.version?.angle_wellness?.[0] || "Wellness",
    durationSec: detail.version?.duration_sec,
    questionCount: detail.version?.question_count ?? questions.length,
    questions,
  };
}

export function formatDuration(durationSec?: number, questionCount = 0) {
  const minutes = durationSec && durationSec > 0 ? Math.ceil(durationSec / 60) : Math.max(1, Math.ceil(questionCount / 2));
  return Math.max(1, minutes);
}

export async function listWellnessTopics() {
  try {
    const data = await fetchWellness<any>(PUBLIC_BASE_PATH + "/topics" + buildQuery({ page: 1, limit: 100 }));
    const topics = normalizeList<any>(data).map(mapListTopic).filter((topic) => topic.slug && topic.title);
    const enriched = await Promise.all(topics.map(async (topic) => {
      const detail = await getWellnessTopic(topic.slug);
      return detail ? { ...topic, ...detail } : topic;
    }));
    return enriched;
  } catch (error) {
    console.error("Failed to fetch wellness topics:", error);
    return [];
  }
}

export async function getWellnessTopic(slug: string) {
  try {
    const data = await fetchWellness<any>(PUBLIC_BASE_PATH + "/topic/" + encodeURIComponent(slug));
    return mapDetail(data);
  } catch (error) {
    console.error("Failed to fetch wellness topic:", error);
    return null;
  }
}

export async function startWellnessTest(slug: string) {
  if (typeof window !== "undefined") {
    return fetchLocalWellness<{ submission_id?: number; questions?: WellnessQuestion[] }>(
      "/api/wellness-test/" + encodeURIComponent(slug) + "/start/",
      { method: "POST" },
    );
  }
  return fetchWellness<{ submission_id?: number; questions?: WellnessQuestion[] }>(
    PUBLIC_BASE_PATH + "/topic/" + encodeURIComponent(slug) + "/start",
    { method: "POST", revalidate: false },
  );
}

export async function completeWellnessTest(slug: string, answers: Array<{ question_id: number; value?: number }>) {
  if (typeof window !== "undefined") {
    return fetchLocalWellness<WellnessCompleteResponse>(
      "/api/wellness-test/" + encodeURIComponent(slug) + "/complete/",
      { method: "POST", body: JSON.stringify({ answers }) },
    );
  }
  return fetchWellness<WellnessCompleteResponse>(
    PUBLIC_BASE_PATH + "/topic/" + encodeURIComponent(slug) + "/complete",
    { method: "POST", body: JSON.stringify({ answers }), revalidate: false },
  );
}
