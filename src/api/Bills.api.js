import {config} from '../config';
import axios from "axios";


export class BillsApi {
    baseUrl = `${config.baseApi}/bills`;

    async getAllFacture(accessToken, pageParam) {
        try {
            let url = `${this.baseUrl}?page=${pageParam}&limit=5`;

            // if (search) {
            //   url = `${config.baseApi}/${configApiBackend.bills}?search=${search}&page=${page}&limit=10`;
            // }

            const params = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    // CREAR PRODUCTO
    async createFacture(accessToken, data) {
        try {
            const input = {
                clientId: data.clientId.value,
                billsDetails: data.billsDetails.map(billDetail => {
                    return {
                        quantity: billDetail.quantity,
                        productId: billDetail.productId.value,
                    }
                })
            }

            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post(`${this.baseUrl}`, input, params);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}  
