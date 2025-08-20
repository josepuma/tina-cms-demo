<template>
    <template v-if="page">
        <ContentRenderer :value="page" />
    </template>
    <template v-else>
        <div>
            <h1>Página no encontrada</h1>
            <p>El contenido que buscas no existe.</p>
            <NuxtLink to="/">Volver al inicio</NuxtLink>
        </div>
    </template>
</template>

<script setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('pages').path(`/pages/${route.params.slug}`).first()
})
</script>
