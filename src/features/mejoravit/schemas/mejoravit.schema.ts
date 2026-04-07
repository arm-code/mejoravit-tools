import { z } from 'zod';

export const calculatorSchema = z.object({
    valorMejora: z.number({
        message: "El valor es requerido y debe ser un número"
    })
        .positive('El valor debe ser mayor a 0')
        .max(169039, 'El límite máximo de préstamo es $169,039'),

    plazo: z.number({
        message: "El plazo es requerido y debe ser un número"
    }).int().min(1, 'Plazo mínimo: 1 año').max(30, 'Plazo máximo: 30 años'),

    // Los radio buttons emiten strings ("true"/"false").
    // z.coerce.boolean() no funciona para strings, así que usamos un pipeline.
    requiereRegularizacion: z
        .union([z.boolean(), z.enum(["true", "false"])])
        .transform((v) => v === true || v === "true"),
})

// Tipo de los valores del formulario (antes de la transformación de Zod)
export type CalculatorInputSchema = z.input<typeof calculatorSchema>;
// Tipo de los valores tras la transformación (lo que llega a onSubmit)
export type CalculatorSchema = z.output<typeof calculatorSchema>;