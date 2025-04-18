import { z } from "zod";

export const systemsReviewSchema = z.object({
  integuementarySystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  musculoskeletalSystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  respiratorySystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  cardiovascularSystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  digestiveSystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  urinarySystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  endocrineSystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  reproductiveSystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  nervousSystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  hematologicSystem: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  mentalHealth: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  sensoryOrgans: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
});
