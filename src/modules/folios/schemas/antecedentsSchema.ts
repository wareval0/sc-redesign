import { z } from "zod";

export const antecedentsSchema = z.object({
  nutrition: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  physicalActivity: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  hydration: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  supplements: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  sleep: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  pathological: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  pharmacological: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  surgical: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  hospitalizations: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  toxic: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  allergic: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  immunization: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  traumatic: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  occupational: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familyHypertension: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familyHeartDisease: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familySeizures: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familyMentalDisorders: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familyCancer: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familyDiabetes: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familyCerebrovascularDisease: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
  familyOther: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(500, "Máximo 500 caracteres")
    .optional(),
});
