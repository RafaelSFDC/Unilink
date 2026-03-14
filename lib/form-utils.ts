export function getFormError(errors: unknown[] | undefined) {
  if (!errors?.length) {
    return undefined;
  }

  for (const error of errors) {
    if (typeof error === "string" && error.trim()) {
      return error;
    }

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.trim()
    ) {
      return error.message;
    }
  }

  return undefined;
}

export function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateRequired(value: string, message: string) {
  return value.trim() ? undefined : message;
}

export function validateUsername(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return "Nome de usuário é obrigatório";
  }

  if (normalized.length < 3) {
    return "Use pelo menos 3 caracteres";
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(normalized)) {
    return "Use apenas letras, números, ponto, hífen ou underscore";
  }

  return undefined;
}
