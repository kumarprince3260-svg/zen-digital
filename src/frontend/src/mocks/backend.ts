import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  sendAIMessage: async (_messages) =>
    "Hello DAKESH KASHYAP! I am ZEN AI, your premium affiliate platform assistant. How can I help you today?",
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
};
