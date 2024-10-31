import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import OrcamentoForm from '@/components/OrcamentoForm.vue'

describe('OrcamentoForm', () => {
  const createWrapper = () => {
    return mount(OrcamentoForm, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
  }

  it('valida campos obrigatórios', async () => {
    const wrapper = createWrapper()
    
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('Material é obrigatório')
    expect(wrapper.text()).toContain('Qualidade é obrigatória')
  })

  it('calcula orçamento corretamente', async () => {
    const wrapper = createWrapper()
    
    // Preencher formulário
    await wrapper.find('select[name="material"]').setValue('pla')
    await wrapper.find('select[name="quality"]').setValue('medium')
    await wrapper.find('input[name="width"]').setValue(100)
    await wrapper.find('input[name="height"]').setValue(100)
    await wrapper.find('input[name="depth"]').setValue(100)
    
    await wrapper.find('form').trigger('submit')
    
    // Verificar resultado
    expect(wrapper.find('.card-body').exists()).toBe(true)
    expect(wrapper.text()).toContain('Resultado do Orçamento')
  })
}) 