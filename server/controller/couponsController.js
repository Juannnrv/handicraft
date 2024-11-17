const Coupon = require('../model/couponModel.js'); 

class CouponController {
  // Método estático para obtener cupones
  static async getCoupons(req, res) {
    try {
      const currentDate = new Date();
      const userId = req.user._id;

      // Obtener parámetros de la consulta
      const { code } = req.query;
  
      // Construir el filtro
      let filter = {
        code: code,
        valid: true,
        expirationDate: { $gte: currentDate }
      };
  
      // Obtener cupones según el filtro
      const coupons = await Coupon.find(filter);
      console.log(filter);
      console.log(coupons);
  
      // Verificar si no se encontraron cupones
      if (coupons.length === 0) {
        return res.status(404).json({ message: 'No hay cupones disponibles para el código proporcionado' });
      }
  
      // Responder con los cupones encontrados
      res.status(200).json({
        status: 200,
        message: "coupons found",
        data: coupons,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener los cupones' });
    }
  }

  static async getGeneralCoupons(req, res) {
    try {
      const currentDate = new Date();

      // Construir el filtro para cupones generales
      const filter = {
        type: "general", // Tipo de cupón general
        valid: true, // Solo cupones válidos
        expirationDate: { $gte: currentDate }, // Fecha de expiración válida
      };

      // Obtener cupones según el filtro
      const generalCoupons = await Coupon.find(filter);
      console.log(filter);
      console.log(generalCoupons);

      // Verificar si no se encontraron cupones
      if (generalCoupons.length === 0) {
        return res.status(404).json({ message: "No hay cupones generales disponibles" });
      }

      // Responder con los cupones generales encontrados
      res.status(200).json({
        status: 200,
        message: "General coupons found",
        data: generalCoupons,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener los cupones generales" });
    }
  }
}

module.exports = CouponController;
