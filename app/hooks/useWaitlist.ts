"use client";

import { useCallback, useEffect, useState } from "react";
import { readWaitlist, saveWaitlist } from "@/app/lib/utils";
import type { WaitlistEntry } from "@/app/types";

export function useWaitlist() {
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    setCount(readWaitlist().length);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addEntry = useCallback(
    (entry: WaitlistEntry): boolean => {
      const list = readWaitlist();
      list.push(entry);
      const ok = saveWaitlist(list);
      if (ok) refresh();
      return ok;
    },
    [refresh]
  );

  const countLabel =
    count === 0
      ? "No launch members have joined yet."
      : `${count} member${count === 1 ? "" : "s"} on the launch access list.`;

  return { count, countLabel, addEntry, refresh };
}
