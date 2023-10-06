import * as yup from 'yup';
import { format, parse } from 'date-fns';
import { isValid } from 'date-fns';

export function initialPetValues(medicalHistory) {
  let dateObject;
  if (medicalHistory?.diagnostic?.surgicalIntervations) {
    dateObject = parse(pet.birthday, 'dd/MM/yyyy', new Date());
  }
  return {
    //medicalHistory?: {
    vacuna: medicalHistory?.isHaveAllVaccine || false,
    reproduccion: medicalHistory?.isReproduced || false,
    descendencia: medicalHistory?.descendants || '',
    habitaculo: medicalHistory?.room || '',
    enfermedad: medicalHistory?.diasesEvaluation || '',
    observacion: medicalHistory?.observation || '',
    //  food: {
    quantityFood: medicalHistory?.food?.quantity || '',
    typeFood: medicalHistory?.food?.type || '',
    //  },
    //  otherPet: {
    convivencia: medicalHistory?.otherPet?.isLiveOtherPets || false,
    whichPets: medicalHistory?.otherPet?.whichPets || '',
    //  },
    //  physicalExam: {
    weight: medicalHistory?.physicalExam?.weight || undefined,
    palpitaciones: medicalHistory?.physicalExam?.palpitations || '',
    temperatura: medicalHistory?.physicalExam?.temperature || undefined,
    frecuenciaRespiratoria: medicalHistory?.physicalExam?.respiratoryRate || undefined,
    frecuenciaCardiaca: medicalHistory?.physicalExam?.cardiacRate || undefined,
    examenLaboratorio: medicalHistory?.physicalExam?.laboratoryExam || '',
    pulso: medicalHistory?.physicalExam?.pulse || '',
    mucus: medicalHistory?.physicalExam?.mucous || '',
    //  },
    //  diagnostic: {
    diagnostic: medicalHistory?.diagnostic?.description || '',
    cantidadTratamientos: undefined,
    tratamientos: medicalHistory?.diagnostic?.treatments || [],
    intervenciones: medicalHistory?.diagnostic?.surgicalIntervations || [],
    //  },
    //},
    uploadedFile: null,
  };
}

export function validationSchemaPetRegister(pet, activeStep) {
  // Anamnesis Schema
  if(activeStep === 0){
    return yup.object({
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
    });
  } else if ( activeStep === 1){
    return yup.object({
      weight: yup
      .number()
      .positive('El peso debe ser positivo para que sea válido')
      .required('El peso de la mascota es obligatorio'),
      palpitaciones: yup
      .string()
      .required('Las palpitaciones obligatorio'),
      temperatura: yup
      .number()
      .positive('La temperatura debe ser positivo para que sea válido')
      .required('La temperatura de la mascota es obligatorio'),
      frecuenciaCardiaca: yup
      .number()
      .positive('La frecuencia cardiaca debe ser positivo para que sea válido')
      .required('La frecuencia cardiaca de la mascota es obligatorio'),
      frecuenciaRespiratoria: yup
      .number()
      .positive('La frecuencia respiratoria debe ser positivo para que sea válido')
      .required('La frecuencia respiratoria de la mascota es obligatorio'),
      palpitaciones: yup
      .string()
      .required('El examen de laboratorio obligatorio'),
      pulso: yup
      .string()
      .required('El pulso obligatorio'),
      mucus: yup
      .string()
      .required('El mucus de la mascota es obligatorio'),
    });
  } else {
    return yup.object({
      diagnostic: yup
      .string()
      .required('El diagnostico obligatorio'),
      cantidadTratamientos: yup
      .number()
      .positive('La cantidad de tratamientos debe ser positivo para que sea válido')
      .required('La cantidad de tratamientos es obligatorio')
      /*tratamientos: yup
      .string()
      .required('El tratamiento obligatorio'),
      intervenciones: yup
      .string()
      .required('La intervencion obligatoria'),*/
    });
  }
  return yup.object({
    /*name: yup.string().required('El nombre es obligatorio'),
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
      .required('El campo para verificar pedigree es obligatorio'),*/
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
  });
}

export function initialTreatmentsValues() {
  return {
    name: '',
    quantityTreatment: '',
    frequencyTreatment: '',
    days: '',
  }
}
export function medicalHistoryTreatmentsSchema(){
  return yup.object({
    name: yup
    .string()
    .required('El nombre del tratamiento es obligatorio'),
    quantityTreatment: yup
    .string()
    .required('La cantidad de tratamiento es obligatoria'),
    frequencyTreatment: yup
    .string()
    .required('La frecuencia de aplicación del tratamiento obligatorio'),
    days: yup
      .number()
      .positive('Los dias de aplicacion deben ser positivo para que sea válido')
      .required('Los dias de aplicacion del tratamiento es obligatorio'),
    });
}
