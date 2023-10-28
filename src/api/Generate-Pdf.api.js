import {ApiAuth} from "./Auth.api.jsx";
import {config} from "../config/index.jsx";
import {format} from "date-fns";
import axios from "axios";

export class GeneratePdfApi {
    apiAuth = new ApiAuth();
    accessToken = this.apiAuth.getAccessToken();
    url = `${config.baseApi}/generate-pdf`;

    async generateConsentPdf(data, petId, petName) {
        try {
            const params = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
                responseType: 'blob',
            };

            const response = await
                axios
                    .post(
                        `${this.url}/consent-surgeries/${petId}`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${this.accessToken}`,
                            },
                            responseType: 'blob',
                        })

            return this.redirectDownloadPdf(response.data, petName, 'consentimiento-cirugía');
        } catch (e) {
            throw e;
        }
    }

    async generateEuthanasiaPdf(data, petId, petName) {
        try {
            const params = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
                responseType: 'blob',
            };

            const response = await
                axios
                    .post(
                        `${this.url}/euthanasias/${petId}`,
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${this.accessToken}`,
                            },
                            responseType: 'blob',
                        })

            return this.redirectDownloadPdf(response.data, petName, 'consentimiento-eutanasia');
        } catch (e) {
            throw e;
        }
    }

    async generateHealthCertificatesPdf(data, petId, petName) {
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
            const params = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
                responseType: 'blob',
            };

            const response = await
                axios
                    .post(
                        `${this.url}/health-certificates/${petId}`,
                        input,
                        {
                            headers: {
                                Authorization: `Bearer ${this.accessToken}`,
                            },
                            responseType: 'blob',
                        })

            return this.redirectDownloadPdf(response.data, petName, 'certificado-salud');
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
}