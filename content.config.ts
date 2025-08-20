import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            type: 'page',
            source: 'pages/**/*.md'
        }),
        posts: defineCollection({
            type: 'page',
            source: 'posts/**/*.md'
        })
    }
})
