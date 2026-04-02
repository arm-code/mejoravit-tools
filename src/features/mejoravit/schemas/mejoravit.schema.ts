import { z } from 'zod';

export const calculatorSchema = z.object({
    valorMejora: z.number({ invalid_type_error: 'Debe ser un número' }).positive('El valor debe ser mayor a 0'),

    plazo: z.number().int().min(1, 'Plazo mínimo: 1 año').max(30, 'Plazo máximo: 30 años'),

    requiereRegularizacion: z.boolean(),
})

export type CalculatorSchema = z.infer<typeof calculatorSchema>;
