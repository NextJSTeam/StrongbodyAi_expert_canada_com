export type WellnessExpert = {
  id: number;
  user_id: number;
  shop_name?: string;
  profession?: string;
  professions?: Array<{ name?: string }>;
  banner_picture?: string;
  about?: string;
  skills?: string[];
  user?: {
    profile_picture?: string;
    country?: { title?: string };
  };
};

type ExpertsResponse = {
  data?: {
    list?: WellnessExpert[];
  };
};

function getApiBaseUrl() {
  return (
    process.env.STRONGBODY_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://api-v2.strongbody.ai"
  ).replace(/\/$/, "");
}

export async function getWellnessExperts(limit = 20): Promise<WellnessExpert[]> {
  try {
    const query = new URLSearchParams({
      page: "1",
      limit: String(limit),
    });

    const response = await fetch(getApiBaseUrl() + "/v1/user/strongbodyai/expert/balanced?" + query.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.STRONGBODY_API_KEY || process.env.NEXT_PUBLIC_API_KEY || "your_api_key",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];
    const data = (await response.json()) as ExpertsResponse;
    return data.data?.list ?? [];
  } catch (error) {
    console.error("Failed to get wellness experts:", error);
    return [];
  }
}
