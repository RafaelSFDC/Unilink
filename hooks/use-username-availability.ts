"use client";

import { useEffect, useState } from "react";
import { validateUsername } from "@/lib/form-utils";

interface UsernameAvailabilityState {
  checking: boolean;
  available: boolean | null;
  message: string;
}

const INITIAL_STATE: UsernameAvailabilityState = {
  checking: false,
  available: null,
  message: "",
};

interface UseUsernameAvailabilityOptions {
  currentUsername?: string;
  enabled?: boolean;
}

export function useUsernameAvailability(
  username: string,
  options: UseUsernameAvailabilityOptions = {},
) {
  const { currentUsername = "", enabled = true } = options;
  const [state, setState] = useState<UsernameAvailabilityState>(INITIAL_STATE);

  useEffect(() => {
    const normalized = username.trim();

    if (!enabled || !normalized || normalized === currentUsername) {
      setState(INITIAL_STATE);
      return;
    }

    const validationError = validateUsername(normalized);
    if (validationError) {
      setState({
        checking: false,
        available: false,
        message: validationError,
      });
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      setState((prev) => ({ ...prev, checking: true }));

      try {
        const response = await fetch(
          `/api/check-username?username=${encodeURIComponent(normalized)}`,
        );

        if (!response.ok) {
          throw new Error("request_failed");
        }

        const data = (await response.json()) as {
          available?: boolean;
          message?: string;
        };

        setState({
          checking: false,
          available: !!data.available,
          message: data.message || "Verificacao concluida",
        });
      } catch {
        setState({
          checking: false,
          available: false,
          message: "Erro temporario ao verificar username",
        });
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [currentUsername, enabled, username]);

  return state;
}
