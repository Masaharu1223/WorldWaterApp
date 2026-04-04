import { vi } from "vitest";

export const supabase = {
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockResolvedValue({ data: [], error: null }),
  }),
};
