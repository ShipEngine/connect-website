const getShipstationHeaders = (headers) => {
  return {
    ['Authorization']: headers.authorization || '',
    ['ShipStation-TransactionID']: headers['shipstation-transactionid'] || ''
  }
}


module.exports = (implementation, request, response) => {
  if(typeof implementation !== 'function') {
    response.status(404).send('Not Supported');
    return;
  }
  const { body, headers } = request;

  const relevantHeaders = getShipstationHeaders(headers);

  implementation(body, relevantHeaders)
  .then(result => response.send(result))
  .catch(error => {
    const statusCode = error.statusCode || 520;
    const responseBody = error.body || error;
    response.status(statusCode).send(responseBody);
  })
};
