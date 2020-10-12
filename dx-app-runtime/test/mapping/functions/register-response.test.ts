import { Transaction } from '@shipengine/connect';
import { mapRegisterResponse, getCredentials } from '../../../src/mapping/functions';

const defaultCredentials = {
    username: 'N/A',
    password: 'N/A'
}

const expectedCredentials: any[][] = [
    [undefined, defaultCredentials],
    [{ userId: '', password: ''}, defaultCredentials],
    [{ userId: 'test', password: ''}, { ...defaultCredentials, username: 'test' }],
    [{ userId: '', password: 'test'}, { ...defaultCredentials, password: 'test' }],
    [{ userId: 'id', password: 'pw'}, { username: 'id', password: 'pw' }],
]

describe('Register Response', () => {
    const session = {
        value1: '1',
        value2: '2',
        value3: '3'
    }
    const transaction = {
        session: {
            ...session,
            _basicAuth: {
                userId: 'id',
                password: 'password'
            }
        },
    };
    
    describe('when we have a fully formed transaction with basicAuth attached', () => {
        const response = mapRegisterResponse(transaction as Transaction<object>);
        it('maps the session correctly', () => expect(response.metadata).toEqual(session));
        it('maps the credentials correctly', () => expect(response.credentials).toEqual({
            username: 'id',
            password: 'password'
        }));
    });
    describe('Get Credentials', () => {
        test.each(expectedCredentials)('getCredentials(%o) maps to %o', (credentials, expected) => {
            expect(getCredentials(credentials)).toEqual(expected);
        });
    });
})