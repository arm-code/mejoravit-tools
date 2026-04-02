import { z } from 'zod';

export const calculatorSchema = z.object({
    valorMejora: z.number({
        message: "El valor es requerido y debe ser un número"
    }).positive('El valor debe ser mayor a 0'),

    plazo: z.number({
        message: "El plazo es requerido y debe ser un número"
    }).int().min(1, 'Plazo mínimo: 1 año').max(30, 'Plazo máximo: 30 años'),

    requiereRegularizacion: z.boolean({
        message: "Debe seleccionar una opción"
    }),
})

export type CalculatorSchema = z.infer<typeof calculatorSchema>;