import { computed } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useOrcamentoValidation() {
  const schema = yup.object({
    material: yup.string().required('Material é obrigatório'),
    quality: yup.string().required('Qualidade é obrigatória'),
    dimensions: yup.object({
      width: yup.number()
        .required('Largura é obrigatória')
        .min(10, 'Mínimo de 10mm')
        .max(300, 'Máximo de 300mm'),
      height: yup.number()
        .required('Altura é obrigatória')
        .min(10, 'Mínimo de 10mm')
        .max(300, 'Máximo de 300mm'),
      depth: yup.number()
        .required('Profundidade é obrigatória')
        .min(10, 'Mínimo de 10mm')
        .max(300, 'Máximo de 300mm')
    })
  })

  const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema
  })

  const { value: material } = useField('material')
  const { value: quality } = useField('quality')
  const { value: width } = useField('dimensions.width')
  const { value: height } = useField('dimensions.height')
  const { value: depth } = useField('dimensions.depth')

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  return {
    material,
    quality,
    width,
    height,
    depth,
    errors,
    isValid,
    handleSubmit,
    resetForm
  }
} 