# Proyecto: Chatbot impulsado con Inteligencia Artificial

## Descripción del Proyecto

Este proyecto es una aplicación web fullstack diseñada específicamente para entrenadores de natación, con el objetivo de facilitar la gestión centralizada de sus equipos y nadadores. Proporciona herramientas modernas para manejar de manera eficiente los datos de los nadadores, incluyendo estadísticas de rendimiento, equipos y sesiones de entrenamiento, todo en una interfaz fácil de usar.

La solución combina una potente arquitectura backend con un diseño frontend interactivo y responsivo, además de integrarse con servicios inteligentes como OpenAI para mejorar la automatización y análisis.

---

## Objetivos

1. **Facilitar la gestión de equipos de natación**: Proveer un sistema intuitivo para que los entrenadores puedan agregar, editar y visualizar los datos de sus nadadores.
2. **Centralizar la información**: Ofrecer un único lugar donde los entrenadores puedan gestionar equipos, entrenamientos y estadísticas.
3. **Automatizar tareas mediante IA**: Usar OpenAI GPT-3.5 Turbo para generar sugerencias, análisis y reportes automáticos.
4. **Desarrollar una aplicación web robusta**: Crear una solución fullstack utilizando Next.js, TypeScript, Prisma y PostgreSQL.
5. **Escalabilidad y facilidad de despliegue**: Integrar Docker y Docker Compose para un despliegue rápido y sencillo.

---

## Funcionalidades Clave

### Para los Entrenadores

- **Gestión de Nadadores**:
  - Registrar nuevos nadadores.
  - Consultar y actualizar la información de cada nadador.
  - Revisar estadísticas históricas y de rendimiento.

- **Gestión de Equipos**:
  - Crear y organizar equipos de entrenamiento.
  - Generar códigos únicos para que los nadadores se unan a los equipos.

- **Sesiones de Entrenamiento**:
  - Planificar y registrar entrenamientos.
  - Realizar seguimiento del progreso de los nadadores en tiempo real.

- **Análisis Automático**:
  - Generar reportes basados en el rendimiento usando OpenAI GPT-3.5 Turbo.
  - Sugerencias automáticas de mejoras o ajustes en los entrenamientos.

### Para los Nadadores

- Unirse a equipos mediante códigos únicos proporcionados por su entrenador.
- Añadir sus variables de manera diaria.

---

## Arquitectura del Sistema

La arquitectura se divide en dos componentes principales:

### 1. **Aplicación Web Fullstack (Carpeta `web`)**
   - **Frontend**:
     - Desarrollado con Next.js y TailwindCSS para un diseño responsivo y moderno.
     - Experiencia de usuario optimizada mediante React Context y hooks personalizados.
   - **Backend**:
     - Gestionado con Node.js y Prisma como ORM.
     - API REST y handlers específicos para la integración con OpenAI GPT-3.5 Turbo.
   - **Base de Datos**:
     - PostgreSQL como sistema de almacenamiento principal.
     - Migraciones y modelos gestionados con Prisma.

### 2. **Microservicios (Carpeta `dockerization`)**
   - **Servicio Web**: Aloja la aplicación frontend y backend.
   - **Base de Datos**: Configurada mediante `init.sql`, conecta con la aplicación para gestionar la información.
   - **Servicio de OpenAI**: Proporciona funcionalidades avanzadas de análisis y automatización a través del modelo GPT-3.5 Turbo.

---

## Instrucciones de instalación y despliegue

> [!NOTE]
> Necesitas tener Docker instalado en tu equipo.
>
Ejecuta el siguiente comando en el directorio `dockerization` para iniciar la aplicación en tu entorno local: 

```bash
docker-compose up --build
```

Una vez completado el proceso, la aplicación estará disponible en http://localhost:3000. Abre tu navegador y visita esta dirección para acceder a la aplicación.

## Cuenta de Prueba

Utilizar la siguiente cuenta de test para ver como sería un caso real:

- Correo: williamerickson@example.com
- Password: 111111
