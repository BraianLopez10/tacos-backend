exports.success = function (req, res, status, message = 'Request success') {
  const statusDefault = status || 200
  res.status(statusDefault).send({
    error: false,
    body: message,
    status: statusDefault
  })
}

exports.error = function (req, res, status, message = 'Internal server error') {
  const statusDefault = status || 500
  res.status(statusDefault).send({
    error: true,
    body: message,
    status: statusDefault
  })
}
