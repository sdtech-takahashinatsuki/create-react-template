import { hasNoParseFetcher } from "@/service/fetcher-get/has-no-parse-fetcher";
import { z } from "zod";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { optionUtility } from "@/utils/option";

const mockFetch = vi.fn();

describe("hasNoParseFetcher", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubGlobal("fetch", mockFetch);
    });

    const { createSome } = optionUtility;

    it("returns ng when schema mismatch", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ x: 1 })
        });

        const schema = z.object({ y: z.string() });

        const result = await hasNoParseFetcher({
            url: createSome("https://example.com"),
            scheme: schema
        });

        expect(result.kind).toBe("ng");
    });

    it("returns ok when matches", async () => {
        const payload = { y: "ok" };
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => payload
        });

        const schema = z.object({ y: z.string() });

        const result = await hasNoParseFetcher({
            url: createSome("https://example.com"),
            scheme: schema
        });

        expect(result.kind).toBe("ok");
        if (result.kind === "ok") {
            expect(result.value).toEqual(payload);
        }
    });
});
