import { ref } from 'vue'
import { useMyData } from './useMyData'

export function useOrcamentoCalculator() {
  const { data: myData } = useMyData()
  const calculating = ref(false)
  const error = ref(null)

  const calculatePrice = (dimensions, materialId, qualityId) => {
    calculating.value = true
    error.value = null

    try {
      const material = myData.value.materials.find(m => m.id === materialId)
      const quality = myData.value.qualities.find(q => q.id === qualityId)

      if (!material || !quality) {
        throw new Error('Material ou qualidade inválidos')
      }

      // Cálculo do volume em cm³
      const volume = (dimensions.width * dimensions.height * dimensions.depth) / 1000

      // Densidade do material (g/cm³)
      const density = {
        pla: 1.24,
        abs: 1.04,
        petg: 1.27
      }[materialId]

      // Peso estimado em gramas
      const weight = volume * density

      // Preço base (peso * preço por grama * multiplicador de qualidade)
      const basePrice = weight * material.price * quality.multiplier

      // Adicionar custos fixos
      const setupCost = 10 // Custo de setup da impressora
      const energyCost = weight * 0.05 // Custo de energia estimado
      
      // Preço final
      const finalPrice = basePrice + setupCost + energyCost

      return {
        success: true,
        data: {
          materialCost: basePrice,
          setupCost,
          energyCost,
          totalWeight: weight,
          totalPrice: finalPrice,
          estimatedTime: calculatePrintTime(weight, quality.id)
        }
      }
    } catch (err) {
      error.value = err.message
      return {
        success: false,
        error: err.message
      }
    } finally {
      calculating.value = false
    }
  }

  const calculatePrintTime = (weight, qualityId) => {
    // Tempo estimado baseado no peso e qualidade
    const baseSpeed = {
      low: 15,    // g/hora
      medium: 12, // g/hora
      high: 8     // g/hora
    }[qualityId]

    return Math.ceil(weight / baseSpeed) // Horas
  }

  return {
    calculatePrice,
    calculating,
    error
  }
} 