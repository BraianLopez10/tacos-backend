const genSlug = require('unique-slug')
const response = require('../../routes/response')
const MpServices = require('../../services/Mp')
const MpServicesInstance = new MpServices()

const storePedido = require('../pedido/store')
const storeCombo = require('../combo/store')
const storeProd = require('../producto/store')

async function checkPedido (comboSlug, extras, total, comboValor) {
  try {
    // OBTENEMOS EL COMBO
    const getCombo = await storeCombo.getBy(comboSlug)
    if (!getCombo) {
      return false
    }
    // Comprabamos que el valor es el mismo
    if (getCombo.valor !== comboValor) {
      return false
    }
    // OBTENEMOS LOS EXTRAS (PRODUCTOS)
    const slugExtras = extras.map((e) => e.slug)
    // Eliminamos repetidos
    const sinRepslugExtras = slugExtras.filter(
      (s, inActual, arreglo) => arreglo.indexOf(s) === inActual
    )
    const getExtras = await storeProd.getAll(sinRepslugExtras)
    // SI LOS PRODUCTOS ENCONTRADOS NO SON IGUALES
    // A LOS PRODUCTOS QUE VIENE ES QUE UN PRODUCTO QUE LLEGO NO ESTA EN LA BASE DE DATOS
    if (getExtras.length !== sinRepslugExtras.length) {
      console.log('UN PRODUCTO QUE LLEGO NO ESTA EN LA BASE DE DATOS')
      return false
    }
    // Se comprueba el total de los extras
    const reducerTotal = (extras, nextItem) => extras + nextItem.valor
    const totalExt = extras.reduce(reducerTotal, 0)
    // si el valor de combo + el valor de los extras es diferente a lo que viene del cliente
    // no se debe seguir con la compra
    if (totalExt + getCombo.valor === total) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

async function getLinkMp (req, res) {
  const {
    combo,
    detallePedidoCombo,
    extras,
    total,
    dataUser,
    observaciones
  } = req.body

  // Si faltan datos no se debe seguir con la creación del link de MP
  if (!combo || !extras || !detallePedidoCombo || !total || !dataUser) { return response.error(req, res, 400, 'Faltan Valores') }

  // Comprabamos la validez del pedido
  const valido = await this.checkPedido(
    combo.slug,
    extras,
    total,
    combo.valor
  )
  if (!valido) return response.error(req, res, 400, 'Error en los valores')

  // CREAMOS EL LINK DE MERCADOPAGO

  // id external_references para preference de MP
  const externalReferences = genSlug()
  const checkcout = await MpServicesInstance.createPaymentsMercadoPago({
    prod: combo,
    dataUser,
    extras,
    externalReferences
  })
  if (checkcout) {
    try {
      await storePedido.create({
        refExternal: externalReferences,
        payer: dataUser,
        combo: combo,
        detallePedidoCombo,
        extras: extras,
        total: total,
        observaciones
      })
      return response.success(req, res, 200, checkcout.body.init_point)
    } catch (err) {
      console.log(err)
      return response.error(req, res)
    }
  }
}

async function updatePedido (paymentId) {
  const payment = await MpServicesInstance.getPayment(paymentId)
  if (payment) {
    const refExternal = payment.response.external_reference
    console.log('ref', refExternal)
    try {
      const dataUpdated = {
        info_pago: {
          status: payment.response.status
        }
      }
      await storePedido.updateBy('refExternal', refExternal, dataUpdated)
      console.log('DONE')
    } catch (err) {
      console.log(err)
    }
  }
}

async function webhook (req, res) {
  try {
    const paymentId = req.query['data.id']
    const { type } = req.query
    if (type === 'payment' && paymentId) {
      updatePedido(paymentId)
    }
  } catch {}
  return res.status(200).send()
}

module.exports = {
  checkPedido,
  getLinkMp,
  webhook
}
