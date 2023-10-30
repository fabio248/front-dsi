import {config, configJwt} from "../config/index.jsx";
import {format} from "date-fns";
import axios from "axios";

export class GeneratePdfApi {
    url = `${config.baseApi}/generate-pdf`;
    params = {
        headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
        },
        responseType: 'blob',
    };

    async generateConsentPdf(data, petId, petName, accessToken) {
        try {
            const response = await
                axios
                    .post(
                        `${this.url}/consent-surgeries/${petId}`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            responseType: 'blob',
                        })

            return this.redirectDownloadPdf(response.data, petName, 'consentimiento-cirugía');
        } catch (e) {
            throw e;
        }
    }

    async generateEuthanasiaPdf(data, petId, petName, accessToken) {
        try {
            const response = await
                axios
                    .post(
                        `${this.url}/euthanasias/${petId}`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            responseType: 'blob',
                        }
                    )

            return this.redirectDownloadPdf(response.data, petName, 'consentimiento-eutanasia');
        } catch (e) {
            throw e;
        }
    }

    async generateHealthCertificatesPdf(data, petId, petName, accessToken) {
        try {
            const input = {
                ...data,
                codePostal: data.codePostal.toString(),
                dateJourney: format(data.dateJourney, 'dd/MM/yyyy'),
                vaccines: data.vaccines.map(vaccine => {
                    return {
                        ...vaccine,
                        dayAplication: format(vaccine.dayAplication, 'dd/MM/yyyy')
                    }
                })
            }

            const response = await
                axios
                    .post(
                        `${this.url}/health-certificates/${petId}`,
                        input,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            responseType: 'blob',
                        }
                    )

            return this.redirectDownloadPdf(response.data, petName, 'certificado-salud');
        } catch (e) {
            throw e;
        }
    }

    async generateMedicalHistoryPdf({data, petId, petName, medicalHistoryId, accessToken}) {
        try {
            const input = {
                ...data,
                clinicalNumber: data.clinicalNumber.toString(),
                deworming: data.deworming.map(deworming => {
                    return {
                        ...deworming,
                        dayAplicationInitDeworming: format(deworming.dayAplicationInitDeworming, 'dd/MM/yyyy'),
                        dayAplicationFinalDeworming: format(deworming.dayAplicationFinalDeworming, 'dd/MM/yyyy'),
                    }
                }),
                vaccines: data.vaccines.map(vaccine => {
                    return {
                        ...vaccine,
                        dayAplicationInit: format(vaccine.dayAplicationInit, 'dd/MM/yyyy'),
                        dayAplicationfinal: format(vaccine.dayAplicationfinal, 'dd/MM/yyyy'),
                    }
                }),
                celos: data.celos.map(celo => {
                    return {
                        dayAplicationInitCelos: celo.dayAplicationInitCelos !== '' ? format(celo.dayAplicationInitCelos, 'dd/MM/yyyy') : '',
                        dayAplicationFinalCelos: celo.dayAplicationFinalCelos !== '' ? format(celo.dayAplicationFinalCelos, 'dd/MM/yyyy') : '',
                    }
                })
            }

            if (input.celos[0].dayAplicationInitCelos === '') {
                input.celos = undefined;
            }

            const response = await
                axios
                    .post(
                        `${this.url}/clinical-sheets/${petId}?medicalHistoryId=${medicalHistoryId}`,
                        input,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            responseType: 'blob',
                        }
                    )

            return this.redirectDownloadPdf(response.data, petName, 'historial-clínico');

        } catch (e) {
            throw e
        }
    }

    async generateBillPdf(billId, accessToken, data = {}) {
        try {
            const response = await
                axios
                    .post(
                        `${this.url}/bills/${billId}`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            responseType: 'blob',
                        }
                    )

            return this.redirectDownloadPdf(response.data, '', 'factura');
        } catch (e) {
            throw e;
        }
    }

    redirectDownloadPdf(data, petName, filename) {
        const href = URL.createObjectURL(data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${filename}-${petName}.pdf`);
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);

        return href;
    }

    getAccessToken() {
        return localStorage.getItem('access');
    }
}