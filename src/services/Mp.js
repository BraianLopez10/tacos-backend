class MpServices {
  constructor () {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token: process.env.ACCESS_MP
      }
    }
    this.mercadopago = require('mercadopago')
    this.configureTokenMp()
  }

  async getPayment (id) {
    try {
      const payment = await this.mercadopago.payment.get(id)
      return payment
    } catch (err) {
      return false
    }
  }

  configureTokenMp () {
    this.mercadopago.configure({
      access_token: this.tokensMercadoPago.test.access_token
    })
  }

  async createPaymentsMercadoPago ({ prod, dataUser, extras, externalReferences }) {
    let items = [
      {
        id: prod.slug,
        // id interno (del negocio) del item
        title: prod.name,
        // nombre que viene de la prop que recibe del controller
        description: prod.desc,
        // descripción del producto
        picture_url: prod.img,
        // url de la imágen del producto
        category_id: prod.slug,
        // categoría interna del producto (del negocio)
        quantity: parseInt(1),
        // cantidad, que tiene que ser un intiger
        currency_id: 'ARS',
        // id de la moneda, que tiene que ser en ISO 4217
        unit_price: parseFloat(prod.valor)
        // el precio, que por su complejidad tiene que ser tipo FLOAT
      }
    ]
    const extrasObject = extras.map((ex) => {
      return {
        id: ex.slug,
        // id interno (del negocio) del item
        title: ex.name,
        // nombre que viene de la prop que recibe del controller
        description: ex.sabor,
        // descripción del producto
        quantity: parseInt(1),
        // cantidad, que tiene que ser un intiger
        currency_id: 'ARS',
        // id de la moneda, que tiene que ser en ISO 4217
        unit_price: parseFloat(ex.valor)
        // el precio, que por su complejidad tiene que ser tipo FLOAT
      }
    })
    items = [...items, ...extrasObject]
    console.log('Items', items)
    const preferences = {
      items,
      payer: {
        name: dataUser.nombre,
        surname: dataUser.nombre,
        adress: {
          street_name: dataUser.direccion,
          street_number: dataUser.numero
        },
        email: dataUser.email,
        phone: {
          area_code: '54',
          number: parseInt(dataUser.telefono)
        }
      },
      payment_methods: {
        // declaramos el método de pago y sus restricciones
        installments: 1,
        excluded_payment_types: [
          {
            id: 'ticket'
          }
        ]
      },
      back_urls: {
        // declaramos las urls de redireccionamiento
        success: 'http://localhost:3000/carrito/pago',
        // url que va a redireccionar si sale todo bien
        pending: 'https://localhost:3000.com/pending',
        // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
        failure: 'https://localhost:3000.com/error'
        // url a la que va a redireccionar si falla el pago
      },
      external_reference: externalReferences,
      marketplace: 'COMIDAS TACOS MEXICO',
      notification_url:
                'https://api-tacos.herokuapp.com/api/v1/payment/webhook?source_news=webhooks',
      // declaramos nuestra url donde recibiremos las notificaciones
      auto_return: 'approved'
      // si la compra es exitosa automaticamente redirige a "success" de back_urls
    }

    try {
      const newPreferences = await this.mercadopago.preferences.create(
        preferences
      )
      return newPreferences
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

module.exports = MpServices
