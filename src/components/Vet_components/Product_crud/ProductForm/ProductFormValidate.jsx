import * as yup from 'yup';

export function initialValuesProduct(product) {

  return {
    nameProduct: product?.nameProduct || '',
    descriptionProduct: product?.descriptionProduct || '', 
    sizeProduct: product?.sizeProduct || '',
    category: product?.category || '',
    sellingProduct: product?.sellingProduct || undefined,
  };
}

export function validationSchemaProductRegister(product) {
  return yup.object({
    nameProduct: yup.string().required('El nombre es obligatorio'), 
    descriptionProduct: yup.string().required('La descripción es obligatoria'), 
    sizeProduct: yup.string().required('La presentación del producto es obligatoria'),
    category: yup.string() 
    .oneOf(     
      ['accesorios', 'alimentos' ,'entrenamiento', 'higiene', 'juguetes',  'medicamento',  'reproduccion',  'bienestar', 'transporte' ], 
      'El campo solo acepta las categorías indicadas') 
    .required('La categoría del producto es obligatoria'),  
    sellingProduct: yup.number() 
    .positive('El precio unitario debe ser positivo para que sea válido') 
    .required('El precio unitario es obligatorio'), 
  });
}
