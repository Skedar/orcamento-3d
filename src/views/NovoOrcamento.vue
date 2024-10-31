<template>
  <div class="container py-4">
    <h2 class="mb-4">Novo Orçamento</h2>
    
    <div class="card shadow-sm">
      <div class="card-body">
        <FileUpload
          @upload-complete="handleUploadComplete"
        />
        
        <div v-if="modelUrl" class="mt-4">
          <h4>Detalhes do Modelo</h4>
          <form @submit.prevent="submitOrcamento" class="row g-3">
            
</template> 