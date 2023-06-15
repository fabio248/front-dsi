import * as yup from 'yup';
import { format, parse } from 'date-fns';
import { isValid } from 'date-fns';

export function initialPetValues(pet) {
  let newBirthday, dateObject;
  if (pet) {
    newBirthday = pet.birthday.split('T');
    newBirthday = format(new Date(newBirthday[0]), 'yyyy-MM-dd');
    dateObject = parse(newBirthday, 'yyyy-MM-dd', new Date());
  }

  return {
    name: pet?.name || '',
    specie: pet?.species || undefined,
    raza: pet?.raza || '',
    color: pet?.color || '',
    isHaveTattoo: pet?.isHaveTatto || undefined,
    birthday: pet? dateObject: null,
    gender: pet?.gender || '',
    pedigree: pet?.pedigree || undefined,
    //medicalHistory: {
      //  food: {
          quantityFood: pet?.medicalHistory?.food?.quantity || '',
          typeFood: pet?.medicalHistory?.food?.type || '',
      //  },
      descendencia: pet?.medicalHistory.descendants || '',
      reproduccion: pet?.medicalHistory.isReproduced || undefined,
      vacuna: pet?.medicalHistory?.isHaveAllVaccine || undefined,
      //  otherPet: {
          convivencia: pet?.medicalHistory?.otherPet?.isLiveOtherPets || undefined,
          whichPets: pet?.medicalHistory?.otherPet?.whichPets || '',
      //  },
      enfermedad: pet?.medicalHistory.diasesEvaluation || '',
      observacion: pet?.medicalHistory?.observation || '',
      habitaculo: pet?.medicalHistory.room || '',
    //  physicalExam: {
        weight: pet?.medicalHistory?.physicalExam?.weight || 0,
        palpitaciones: pet?.medicalHistory?.physicalExam?.palpitations || '',
    //  },
    //},
  };
}

export function validationSchemaPetRegister(pet) {
  return yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    specie: yup
    .string()
    .min(1)
    .max(7)
    .required('El campo de especie solo acepta las especies listadas'),
    raza: yup.string().required('La raza es obligatoria'),
    color: yup.string().required('El color de pelaje es obligatorio'),
    isHaveTattoo: yup
    .boolean(),
    //.required('El campo para verificar existencia de tatuaje es obligatorio'),
    birthday: yup.date()
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
    .oneOf(['masculino', 'femenino'])
    .required('El campo de género solo acepta macho o hembra'),
    pedigree: yup
    .boolean()
    .required('El campo para verificar pedigree es obligatorio'),
    quantityFood: yup.string().required('La cantidad de alimento es obligatoria'),
    typeFood: yup.string().required('El tipo de alimento es obligatorio'),
    descendencia: yup.string().required('La descendencia es obligatoria'),
    reproduccion: yup
    .boolean(),
    //.required('El campo de verificación de reproducción es obligatorio'),
    vacuna: yup
    .boolean(),
    //.required('El campo de verificación de vacunas es obligatorio'),
    convivencia: yup
    .boolean(),
    //.required('El campo de convivencia con otras mascotas es obligatorio'),
    whichPets: yup
    .string()
    .when('convivencia', {
      is: true,
      then: () => yup.string().required('Si convive con tras mascotas, ¿Cuáles mascotas?'),
      otherwise: () => yup.string(),
    }),
    enfermedad: yup.string().required('Los detalles de la enfermedad o falta de ella son requeridos'),
    observacion: yup.string().required('Las observaciones son obligatorias'),
    habitaculo: yup.string().required('El habitáculo es obligatorio'),
    weight: yup.number().required('El peso de la mascota es obligatorio'),
    palpitaciones: yup.string().required('Las palpitaciones obligatorio'),
  });
}
