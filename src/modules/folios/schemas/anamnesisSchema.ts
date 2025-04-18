import { z } from "zod";

export const anamnesisSchema = z.object({
  motive: z
    .string()
    .min(1, "Motivo es requerido")
    .max(500, "Motivo debe tener máximo 500 caracteres"),
  description: z
    .string()
    .min(1, "Descripción es requerida")
    .max(12500, "Descripción debe tener máximo 12500 caracteres"),
});
