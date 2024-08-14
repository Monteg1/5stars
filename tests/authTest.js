const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../App'); // Импортируем приложение
const expect = chai.expect;

chai.use(chaiHttp);

let server; // Переменная для хранения запущенного сервера

describe('Authentication', () => {
    // Запускаем сервер перед тестами
    before((done) => {
        server = app.listen(5000, () => {
            done();
        });
    });

    // Останавливаем сервер после завершения всех тестов
    after((done) => {
        server.close(() => {
            done();
        });
    });

    it('should register a new user', (done) => {
        chai.request(server)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpass' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('token');
                done();
            });
    });

    it('should login an existing user', (done) => {
        chai.request(server)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpass' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                done();
            });
    });
});
