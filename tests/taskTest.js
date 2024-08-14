const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../App'); // Импортируем приложение
const expect = chai.expect;

chai.use(chaiHttp);

let server; // Переменная для хранения запущенного сервера
let token;
let taskId;

describe('Tasks', () => {
    // Запускаем сервер перед тестами
    before((done) => {
        server = app.listen(5000, () => {
            chai.request(server)
                .post('/api/auth/login')
                .send({ username: 'testuser', password: 'testpass' })
                .end((err, res) => {
                    token = res.body.token;
                    done();
                });
        });
    });

    // Останавливаем сервер после завершения всех тестов
    after((done) => {
        server.close(() => {
            done();
        });
    });

    it('should create a new task', (done) => {
        chai.request(server)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New Task', description: 'Task description' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('title', 'New Task');
                taskId = res.body._id;
                done();
            });
    });

    it('should update an existing task', (done) => {
        chai.request(server)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Task', description: 'Updated description' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('title', 'Updated Task');
                done();
            });
    });

    it('should delete an existing task', (done) => {
        chai.request(server)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Task removed');
                done();
            });
    });
});
