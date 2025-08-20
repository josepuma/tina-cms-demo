import { defineConfig } from "tinacms";

export default defineConfig({
    branch: "main",
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: process.env.TINA_TOKEN,

    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },

    media: {
        tina: {
            mediaRoot: "uploads", // Carpeta donde se guardan imágenes
            publicFolder: "public",
        },
    },

    schema: {
        collections: [
            // PÁGINAS PRINCIPALES
            {
                name: "pages",
                label: "📄 Páginas",
                path: "content/pages",
                format: "md",
                ui: {
                    router: ({ document }) => `/${document._sys.filename}`,
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Título de la página",
                        isTitle: true,
                        required: true,
                        description: "Este título aparecerá en la pestaña del navegador",
                    },
                    {
                        type: "string",
                        name: "description",
                        label: "Descripción SEO",
                        description: "Descripción que aparece en Google (máximo 160 caracteres)",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "image",
                        name: "hero_image",
                        label: "Imagen principal",
                        description: "Imagen que aparece al inicio de la página",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Contenido de la página",
                        isBody: true,
                        templates: [
                            {
                                name: "VideoEmbed",
                                label: "📹 Video",
                                fields: [
                                    {
                                        name: "url",
                                        label: "URL del video",
                                        type: "string",
                                        description: "Link de YouTube, Vimeo, etc.",
                                    },
                                    {
                                        name: "caption",
                                        label: "Descripción del video",
                                        type: "string",
                                    },
                                ],
                            },
                            {
                                name: "ImageGallery",
                                label: "🖼️ Galería de imágenes",
                                fields: [
                                    {
                                        name: "images",
                                        label: "Imágenes",
                                        type: "object",
                                        list: true,
                                        fields: [
                                            {
                                                name: "src",
                                                label: "Imagen",
                                                type: "image",
                                            },
                                            {
                                                name: "alt",
                                                label: "Descripción de la imagen",
                                                type: "string",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: "CallToAction",
                                label: "🔘 Botón de acción",
                                fields: [
                                    {
                                        name: "text",
                                        label: "Texto del botón",
                                        type: "string",
                                    },
                                    {
                                        name: "link",
                                        label: "Enlace",
                                        type: "string",
                                    },
                                    {
                                        name: "style",
                                        label: "Estilo del botón",
                                        type: "string",
                                        options: ["primary", "secondary", "outline"],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "boolean",
                        name: "published",
                        label: "Página publicada",
                        description: "Desmarcar para ocultar la página del sitio",
                    },
                ],
            },

            // BLOG POSTS
            {
                name: "posts",
                label: "📝 Blog",
                path: "content/posts",
                format: "md",
                ui: {
                    router: ({ document }) => `/blog/${document._sys.filename}`,
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Título del post",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Fecha de publicación",
                        required: true,
                        ui: {
                            dateFormat: "DD/MM/YYYY",
                        },
                    },
                    {
                        type: "string",
                        name: "author",
                        label: "Autor",
                    },
                    {
                        type: "string",
                        name: "excerpt",
                        label: "Resumen corto",
                        description: "Breve descripción que aparece en la lista de posts",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "image",
                        name: "cover",
                        label: "Imagen de portada",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "category",
                        label: "Categoría",
                        options: [
                            { label: "Noticias", value: "news" },
                            { label: "Tutoriales", value: "tutorial" },
                            { label: "Opinión", value: "opinion" },
                            { label: "Actualización", value: "update" },
                        ],
                    },
                    {
                        type: "string",
                        name: "tags",
                        label: "Etiquetas",
                        list: true,
                        description: "Presiona Enter para agregar cada etiqueta",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Contenido del post",
                        isBody: true,
                        templates: [
                            {
                                name: "VideoEmbed",
                                label: "📹 Video",
                                fields: [
                                    {
                                        name: "url",
                                        label: "URL del video",
                                        type: "string",
                                    },
                                    {
                                        name: "caption",
                                        label: "Descripción",
                                        type: "string",
                                    },
                                ],
                            },
                            {
                                name: "Quote",
                                label: "💬 Cita destacada",
                                fields: [
                                    {
                                        name: "text",
                                        label: "Texto de la cita",
                                        type: "string",
                                        ui: {
                                            component: "textarea",
                                        },
                                    },
                                    {
                                        name: "author",
                                        label: "Autor de la cita",
                                        type: "string",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "boolean",
                        name: "featured",
                        label: "Post destacado",
                        description: "Aparecerá en la página principal",
                    },
                    {
                        type: "boolean",
                        name: "published",
                        label: "Post publicado",
                        description: "Desmarcar para guardar como borrador",
                    },
                ],
            },

            // CONFIGURACIÓN GENERAL
            {
                name: "settings",
                label: "⚙️ Configuración",
                path: "content/settings",
                format: "json",
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                fields: [
                    {
                        type: "string",
                        name: "site_name",
                        label: "Nombre del sitio",
                        required: true,
                    },
                    {
                        type: "string",
                        name: "site_description",
                        label: "Descripción del sitio",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "image",
                        name: "logo",
                        label: "Logo del sitio",
                    },
                    {
                        type: "string",
                        name: "contact_email",
                        label: "Email de contacto",
                    },
                    {
                        type: "string",
                        name: "phone",
                        label: "Teléfono",
                    },
                    {
                        type: "object",
                        name: "social_media",
                        label: "Redes sociales",
                        fields: [
                            {
                                type: "string",
                                name: "facebook",
                                label: "Facebook URL",
                            },
                            {
                                type: "string",
                                name: "instagram",
                                label: "Instagram URL",
                            },
                            {
                                type: "string",
                                name: "twitter",
                                label: "Twitter URL",
                            },
                            {
                                type: "string",
                                name: "linkedin",
                                label: "LinkedIn URL",
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
