const mongoose = require('mongoose')

const PedidoSchema = new mongoose.Schema(
  {
    refExternal: {
      type: String,
      unique: true,
      index: true
    },
    payer: {},
    combo: {},
    detallePedidoCombo: {
      type: Array
    },
    extras: {
      type: Array
    },
    total: Number,
    observaciones: String,
    info_pago: {
      status: {
        type: String,
        default: 'pending'
      }
    }
  },
  { toJSON: { virtuals: true }, id: false, timestamps: true }
)

module.exports = mongoose.model('pedido', PedidoSchema)

// let exampleObject = {
//     combo: {
//         main: [
//             {
//                 name: 'taco',
//                 cant: '4',
//                 sabores: ['carne', 'pollo', 'vegetal'],
//                 type: 'comida',
//             },
//         ],
//         bebidas: [
//             { name: 'coca-cola 1.5l', cant: '2', sabores: [], type: 'bebida' },
//         ],
//         estado: 'habilitado',
//         _id: '5f77175448c19b0028d45037',
//         name: '4 Burrito y 1 Coca-Cola',
//         desc: '4 Burrito y 1 Coca-Cola para 2 Personas !',
//         valor: 450,
//         img:
//             'https://tacos-mexico.s3.sa-east-1.amazonaws.com/image-prod-1601640275640.jpeg',
//         slug: '0735a5c0',
//         createdAt: '2020-10-02T12:04:36.153Z',
//         updatedAt: '2020-10-02T12:04:41.956Z',
//         __v: 0,
//     },
//     detallePedidoCombo: [
//         {
//             name: 'taco',
//             sabores: [
//                 { sabor: 'carne', cant: 2 },
//                 { sabor: 'pollo', cant: 2 },
//             ],
//         },
//     ],
//     extras: [
//         { name: '1x taco', valor: 210, slug: 'b55c8e86', sabor: 'pollo' },
//         { name: '1x coca-cola 1.5l', valor: 180, slug: '520b898a', sabor: '' },
//     ],
//     total: 840,
//     observaciones: 'El envio si puede ser lo antes posible , gracias ! ',
// }
