describe.skip("are these a thing?", () => {
  test("TODO", () => {});
});
/*
import requestMapper from '../src/functions/login/request';
import responseMapper from '../src/functions/login/response';

describe('Login Function Maps Correclty', () => {
  test('Register Request maps to TransactionConfig', () => {
    const request = {
      'registration_info': {
        'client_id': 'x3345xxh5',
        'client_secret': 'xxy3she34oiosdkfjo3',
        'access_license': '1234567m'
      },
      'warehouses': [],
      'transaction_id': '4af2c454-bfc9-404c-bfd4-3924b6ef611c',
      'metadata': {
        'example': 'value'
      }
    };
    const response = requestMapper(request);
    expect(response).toBeDefined();
    expect(response.id).toBe(request.transaction_id);
    expect(response.session).toBeDefined();
    expect(response.session).toMatchObject(request.registration_info);
    expect(response.session).toMatchObject(request.metadata);
  });

  test('Register Response maps to TransactionConfig', () => {
    const transaction = {
      'id': '4af2c454-bfc9-404c-bfd4-3924b6ef611c',
      'session': {
        'client_id': 'x3345xxh5',
        'client_secret': 'xxy3she34oiosdkfjo3',
        'access_license': '1234567m',
        'example': 'value'
      }
    };
    const response = responseMapper(transaction);
    expect(response).toBeDefined();
    expect(response.credentials).toBeDefined();
    expect(response.metadata).toBeDefined();
    expect(response.metadata).toMatchObject(transaction.session);
  });
});
*/
