import { config, configApiBackend } from '../config';

export class Product {
  
   //OBTENER TODOS LOS PRODUCTOS REGISTRADOS EN LA BASE
  async getAllProducts(accessToken, page, search = null) {
    try {
      let url = `${config.baseApi}/${configApiBackend.products}?page=${page}&limit=10`;

      if (search) {
        url = `${config.baseApi}/${configApiBackend.products}?search=${search}&page=${page}&limit=10`;
      }

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
  async createProduct(accessToken, product) {
    try {
      const url = `${config.baseApi}/${configApiBackend.products}`;
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


  // ACTUALIZAR UN PRODUCTO
  async updateProduct(accessToken, idProduct, data) {
    try {
      const url = `${config.baseApi}/${configApiBackend.products}/${idProduct}`;
      const params = {
        method: 'PATCH', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nameProduct: data.nameProduct,
            descriptionProduct: data.descriptionProduct,           
            category: data.category,
            sizeProduct: data.sizeProduct,
            sellingProduct: data.sellingProduct,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

    // ELIMINAR UN PRODUCTO
    async deleteProduct(accessToken, idProduct) {
      try {
        const url = `${config.baseApi}/${configApiBackend.products}/${idProduct}`;
        const params = {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        };
  
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 200) throw result;
  
        return result;
      } catch (error) {
        throw error;
      } 
  }

  /*
  // OBTENER PRODUCTOS POR ID
  async getProduct(accessToken) {
    try {
      // Se decodifica el token para obtener su información
      const PRODUCT_ID = decoderToken(accessToken).identify;

      // URL de conexion con el backend
      const url = `${config.baseApi}/${configApiBackend.products}/${PRODUCT_ID}`;

      const params = {
        method: 'GET', // Tipo de peticion, puede ser (PUT, DELETE, POST. etc.)
        headers: {
          // El tipo de contenido (este puede ser Authorization, Content-Type, conection etc)
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // Valida la respuesta del back

      return result;
    } catch (error) {
      throw error; // Manejo del error
    }
  }*/
}