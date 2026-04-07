import { z } from 'zod';

export const userSchema = z.object({
    nss: z
        .string()
        .min(1, 'El NSS es requerido')
        .regex(/^\d{11}$/, 'El NSS debe tener exactamente 11 dígitos numéricos'),

    rfc: z
        .string()
        .min(1, 'El RFC es requerido')
        .regex(
            /^[A-ZÑ&]{3,4}\d{6}([A-Z\d]{3})?$/i,
            'El RFC debe tener 10 o 13 caracteres (ej. RORR860708 o RORR860708LE3)'
        ),

    nombre: z
        .string()
        .min(2, 'El nombre es requerido')
        .max(100, 'El nombre es demasiado largo'),
});

export type UserSchema = z.infer<typeof userSchema>;
