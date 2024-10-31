<template>
  <div class="container py-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Início</router-link>
        </li>
        <li class="breadcrumb-item active">Novo Orçamento</li>
      </ol>
    </nav>

    <div class="card shadow">
      <div class="card-body">
        <h2 class="card-title mb-4">Criar Orçamento</h2>
        
        <OrcamentoForm
          @orcamento-approved="handleOrcamentoApproved"
          @calculation-complete="handleCalculationComplete"
        />
      </div>
    </div>

    <div v-if="showSummary" class="card mt-4 shadow">
      <div class="card-body">
        <h3 class="card-title">Resumo do Orçamento</h3>
        <OrcamentoSummary
          :orcamento="currentOrcamento"
          :materials="materialsData"
          :qualities="qualitiesData"
        />
      </div>
    </div>
  </div>
</template> 