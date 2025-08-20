<template>
    <template v-if="page">
        <ContentRenderer :value="page" />
    </template>
    <template v-else>
        <div>
            <h1>Página no encontrada</h1>
            <p>El contenido no existe.</p>
        </div>
    </template>
</template>

<script setup>
const route = useRoute()
const { data: page } = await useAsyncData('home', () => {
    return queryCollection('pages').path('/pages/home').first()
})
</script>
