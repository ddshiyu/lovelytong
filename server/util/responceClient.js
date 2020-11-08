function responceClient(res, data, code=200, message='请求成功') {
  let result = {}
  result.data = data
  result.message = message
  result.code = code
  res.status(code).send(result)
}

module.exports = responceClient