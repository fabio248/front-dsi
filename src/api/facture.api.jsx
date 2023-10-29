import { config, configApiBackend } from '../config';
export class Facture {
    async getAllFacture(accessToken, pageParam) {
      try {
        let url = `${config.baseApi}/${configApiBackend.bills}?page=${pageParam}&limit=10`;
  
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
   async createFacture(accessToken, facture) {
    try {
      const url = `${config.baseApi}/${configApiBackend.bills}`;
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameProduct: product.nameProduct,
          descriptionProduct: product.descriptionProduct,       
          sizeProduct: product.sizeProduct,
          category: product.category,
          sellingProduct: product.sellingProduct,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}  
