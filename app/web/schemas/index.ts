import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'El correo electrónico es requerido.'
  }), 
  password: z.string().min(1, {
    message: 'La contraseña es requerida.'
  })
}) 

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es requerido.'
  }),
  email: z.string().email({
    message: 'El correo electrónico es requerido.'
  }), 
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 carácteres.'
  }), 
  confirmPassword: z.string(), 
  role: z.enum(['swimmer', 'coach'], {
    message: 'Elige tu rol.'
  })
})

export const SwimmerDataSchema = z.object({
  sleepHours: z
    .coerce.number({
      message: "Introduce un número"
    })
    .int({
      message: "Tiene que ser un número entero."
    })
    .min(0, "Las horas de sueño no pueden ser negativas.")
    .max(24, "Las horas de sueño no pueden superar 24."),

  sleepQuality: z
    .coerce.number({
      message: "Introduce un número"
    })  
    .int({
      message: "Tiene que ser un número entero."
    })
    .min(1, "La calidad de sueño deber ser al menos 1.")
    .max(10, "La calidad de sueño no puede superar 10."), 

  fatigue: z
    .coerce.number({
      message: "Introduce un número"
    })
    .int({
      message: "Tiene que ser un número entero."
    })
    .min(1, "El nivel de fatiga deber ser al menos 1.")
    .max(10, "El nivel de fatiga no puede superar 10."), 

  musclePain: z
    .coerce.number({
      message: "Introduce un número"
    })
    .int({
      message: "Tiene que ser un número entero."
    })
    .min(1, "El dolor muscular debe ser al menos 1.")
    .max(10, "El dolor muscular no puede superar 10."), 

  stress: z
    .coerce.number({
      message: "Introduce un número"
    })
    .int({
      message: "Tiene que ser un número entero."
    })
    .min(1, "El nivel de estrés deber ser al menos 1.")
    .max(10, "El nivel de estrés no puede superar 10."), 
})

export const CreateGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, { message: "Elige el nombre del grupo."}), 
  swimmers: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Elige al menos un nadador.")

})