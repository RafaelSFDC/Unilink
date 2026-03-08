const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export interface AnalyticsData {
  views: { date: string; count: number }[];
  totalViews: number;
}

export async function getPostHogAnalytics(username: string): Promise<AnalyticsData | null> {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    console.error("PostHog API Key or Project ID missing");
    return null;
  }

  try {
    // Busca views dos últimos 7 dias para o perfil do usuário
    // Filtramos pelo pathname que contém o username
    const url = `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/insights/trend/?events=[{"id":"$pageview","math":"dau"}]&properties=[{"key":"$pathname","value":"/${username}","operator":"icontains"}]&period=day&date_from=-7d`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
      },
      next: { revalidate: 3600 }, // Cache de 1 hora
    });

    if (!response.ok) {
      throw new Error(`PostHog API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Processa os dados para o formato que o Recharts espera
    const result = data.result?.[0];
    if (!result) return { views: [], totalViews: 0 };

    const views = result.data.map((count: number, index: number) => ({
      date: result.labels[index],
      count,
    }));

    const totalViews = result.count;

    return { views, totalViews };
  } catch (error) {
    console.error("Erro ao buscar dados do PostHog:", error);
    return null;
  }
}
