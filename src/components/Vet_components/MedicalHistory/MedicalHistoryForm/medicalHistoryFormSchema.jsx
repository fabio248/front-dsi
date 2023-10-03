import * as yup from 'yup';
import { format, parse } from 'date-fns';
import { isValid } from 'date-fns';

export function initialPetValues(pet) {
  let dateObject;
  if (pet) {
    dateObject = parse(pet.birthday, 'dd/MM/yyyy', new Date());
  }
  return {
    name: pet?.name || '',
    specie: pet?.specie || null,
    raza: pet?.raza || '',
    color: pet?.color || '',
    isHaveTattoo: pet?.isHaveTatto || false,
    birthday: pet ? dateObject : null,
    gender: pet?.gender || '',
    pedigree: pet?.pedigree || false,
    //medicalHistory: {
    //  food: {
    quantityFood: pet?.medicalHistory?.food?.quantity || '',
    typeFood: pet?.medicalHistory?.food?.type || '',
    //  },
    descendencia: pet?.medicalHistory.descendants || '',
    reproduccion: pet?.medicalHistory.isReproduced || false,
    vacuna: pet?.medicalHistory?.isHaveAllVaccine || false,
    //  otherPet: {
    convivencia: pet?.medicalHistory?.otherPet?.isLiveOtherPets || false,
    whichPets: pet?.medicalHistory?.otherPet?.whichPets || '',
    //  },
    enfermedad: pet?.medicalHistory.diasesEvaluation || '',
    observacion: pet?.medicalHistory?.observation || '',
    habitaculo: pet?.medicalHistory.room || '',
    //  physicalExam: {
    weight: pet?.medicalHistory?.physicalExam?.weight || undefined,
    palpitaciones: pet?.medicalHistory?.physicalExam?.palpitations || '',
    //  },
    //},
    uploadedFile: null,
  };
}

export function validationSchemaPetRegister(pet) {
  return yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    specie: yup
      .object()
      .required('El campo de especie solo acepta las especies listadas'),
    raza: yup.string().required('La raza es obligatoria'),
    color: yup.string().required('El color de pelaje es obligatorio'),
    isHaveTattoo: yup.boolean(),
    //.required('El campo para verificar existencia de tatuaje es obligatorio'),
    birthday: yup
      .date()
      .max(new Date(), 'La fecha no puede ser posterior al día de hoy')
      .transform((value, originalValue) => {
        if (originalValue) {
          const date = new Date(originalValue);
          return isValid(date) ? date : new Date('invalid');
        }
        return null;
      })
      .required('La fecha es requerida')
      .typeError('Ingrese una fecha válida'),
    gender: yup
      .string()
      .oneOf(
        ['macho', 'hembra'],
        'El campo de género solo acepta macho o hembra'
      )
      .required('El campo de género solo acepta macho o hembra'),
    pedigree: yup
      .boolean()
      .required('El campo para verificar pedigree es obligatorio'),
    quantityFood: yup
      .string()
      .required('La cantidad de alimento es obligatoria'),
    typeFood: yup.string().required('El tipo de alimento es obligatorio'),
    descendencia: yup.string().required('La descendencia es obligatoria'),
    reproduccion: yup.boolean(),
    //.required('El campo de verificación de reproducción es obligatorio'),
    vacuna: yup.boolean(),
    //.required('El campo de verificación de vacunas es obligatorio'),
    convivencia: yup.boolean(),
    //.required('El campo de convivencia con otras mascotas es obligatorio'),
    whichPets: yup.string().when('convivencia', {
      is: true,
      then: () =>
        yup
          .string()
          .required(
            'Se verificó que convive con otras mascotas, por lo tanto este campo ahora es requerido'
          ),
      otherwise: () => yup.string(),
    }),
    enfermedad: yup
      .string()
      .required('Los detalles de la enfermedad o falta de ella son requeridos'),
    observacion: yup.string().required('Las observaciones son obligatorias'),
    habitaculo: yup.string().required('El habitáculo es obligatorio'),
    weight: yup
      .number()
      .positive('El peso debe ser positivo para que sea válido')
      .required('El peso de la mascota es obligatorio'),
    palpitaciones: yup.string().required('Las palpitaciones obligatorio'),
  });
}