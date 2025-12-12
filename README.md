# Curso AWS Fullstack con Node.js y React

Este repositorio contiene el código del proyecto que construimos en el curso **“AWS Fullstack con Node.js y React”** de [eduardoarias.co](https://eduardoarias.co).

🔗 **Página oficial del curso:**  
https://eduardoarias.co/producto/curso-aws-fullstack-con-nodejs-y-react/


Si no eres estudiante, en el enlace de arriba puedes comprar el curso y ver la información sobre los descuentos actuales.
---

## 🚀 ¿Qué vas a encontrar aquí?

A lo largo del curso construimos una aplicación **fullstack en la nube** usando:

- **Frontend:** React  
- **Backend:** Node.js + Express  
- **Almacenamiento:** Amazon S3  
- **Procesamiento de video:** AWS MediaConvert  
- **Funciones serverless:** AWS Lambda  
- **Mensajería:** Amazon SQS  
- **Notificaciones:** Amazon SNS  
- **Moderación de contenido:** Amazon Rekognition  
- **Monitoreo y logs:** Amazon CloudWatch  

El objetivo es que termines con un **pipeline de video real**:  
desde que el usuario sube un archivo, hasta que el video final procesado queda listo para verse.

---

## 🧱 Organización del proyecto

> Nota: los nombres de carpetas pueden variar un poco según la versión. Usa esto como guía general.

- `/backend` – API en Node.js/Express, endpoints para subir archivos, crear jobs, recibir notificaciones, etc.
- `/frontend` – Aplicación en React para que el usuario suba el video y vea el resultado.
- `/scripts` o `/lambda` – Código auxiliar para funciones Lambda (si aplica en tu versión del curso).
- `/docs` – Recursos adicionales, diagramas o notas (opcional).

Si estás haciendo el curso, es posible que veas **ramas o tags por sesión**, por ejemplo:

- `primera sesion`
- `segunda sesion`
- `tercera sesion`

Revisa las ramas para ver el estado del proyecto en cada parte del curso.

---

## ✅ Requisitos

Antes de clonar el repositorio asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (recomendado **LTS**)
- npm o yarn
- Una cuenta de AWS configurada
- Credenciales de AWS con permisos para:
  - S3  
  - MediaConvert  
  - Lambda  
  - SQS  
  - SNS  
  - Rekognition  
  - CloudWatch  

> ⚠️ **Importante:** Nunca subas tus credenciales reales al repositorio.  
> Usa siempre archivos `.env` que estén en tu `.gitignore`.

---

## 🔐 Variables de entorno

En la raíz del backend crea un archivo `.env` (basado en un posible `.env.example`) con variables como:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=TU_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=TU_SECRET_KEY

S3_INPUT_BUCKET=tu-bucket-entrada
S3_OUTPUT_BUCKET=tu-bucket-salida

MEDIACONVERT_ENDPOINT=https://abcd1234.mediaconvert.us-east-1.amazonaws.com
MEDIACONVERT_ROLE_ARN=arn:aws:iam::123456789012:role/MediaConvertRole

SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/mi-cola
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:mi-topico



🙋‍♂️ Soporte y comunidad

Si estás inscrito al curso:
	•	Tienes acceso al servidor privado de Discord, donde puedes hacer preguntas y compartir tu código.
	•	Dependiendo del plan, también puedes tener acceso a asesoría 1:1.

La información y enlaces de acceso están dentro de la plataforma del curso.










---
### 🌎 Sígueme en mis redes sociales

- ✅ YouTube: [@eduardoarias](https://www.youtube.com/@eduardoarias)
- ✅ Instagram: https://www.instagram.com/eduardoarias.co/