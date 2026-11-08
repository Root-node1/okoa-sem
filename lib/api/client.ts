import type {
  ApiEnvelope,
  ApiErrorResponse,
  BackendAcademicEvent,
  BackendClaim,
  BackendUser,
} from "@/types/api";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly requestId?: string
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => null)) as ApiErrorResponse | null;
    throw new ApiRequestError(
      payload?.error.message ?? `Request failed with status ${response.status}.`,
      response.status,
      payload?.error.code ?? "REQUEST_FAILED",
      payload?.error.requestId
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const backendApi = {
  async login(email: string, password: string): Promise<BackendUser> {
    const res = await apiRequest<ApiEnvelope<BackendUser>>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return res.data;
  },

  async register(
    fullName: string,
    email: string,
    password: string
  ): Promise<BackendUser> {
    const res = await apiRequest<ApiEnvelope<BackendUser>>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    });
    return res.data;
  },

  async me(): Promise<BackendUser> {
    const res = await apiRequest<ApiEnvelope<BackendUser>>("/auth/me");
    return res.data;
  },

  async logout(): Promise<void> {
    await apiRequest<void>("/auth/logout", { method: "POST" });
  },

  async listClaims(status?: string): Promise<BackendClaim[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    const res = await apiRequest<ApiEnvelope<BackendClaim[]>>(`/claims${query}`);
    return res.data;
  },

  async approveClaim(
    claimId: string,
    corrections?: Record<string, unknown>
  ): Promise<{ claim: BackendClaim; event: BackendAcademicEvent }> {
    const res = await apiRequest<
      ApiEnvelope<{ claim: BackendClaim; event: BackendAcademicEvent }>
    >(`/claims/${claimId}/approve`, {
      method: "POST",
      body: JSON.stringify(corrections ?? {}),
    });
    return res.data;
  },

  async rejectClaim(claimId: string, reason?: string): Promise<BackendClaim> {
    const res = await apiRequest<ApiEnvelope<BackendClaim>>(
      `/claims/${claimId}/reject`,
      {
        method: "POST",
        body: JSON.stringify({ reason: reason ?? "Discrepancy flagged in review" }),
      }
    );
    return res.data;
  },

  async submitSource(input: {
    courseCode: string;
    title?: string;
    text: string;
    sourceType?: "text" | "whatsapp_export";
  }): Promise<{
    source: { id: string; status: string };
    extraction: { claims: BackendClaim[]; failed: boolean; summary?: string };
  }> {
    const res = await apiRequest<
      ApiEnvelope<{
        source: { id: string; status: string };
        extraction: { claims: BackendClaim[]; failed: boolean; summary?: string };
      }>
    >("/sources", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return res.data;
  },

  async listEvents(): Promise<BackendAcademicEvent[]> {
    const res = await apiRequest<ApiEnvelope<BackendAcademicEvent[]>>("/events");
    return res.data;
  },
};

