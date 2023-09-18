import { createServer, Model, RestSerializer } from 'miragejs';
import { v4 as uuidv4 } from 'uuid';

function createMockServer() {
 return createServer({
  models: {
    user: Model,
  },

  serializers: {
    application: RestSerializer.extend({
      embed: true, // Enable embedding data
      root: false, // Do not include a root element in the response
    }),
  },

  seeds(server) {
    server.create('user', { id: uuidv4(), name: 'John Roy', email: 'john@gmail.com', phoneNumber: '1234567890' });
    server.create('user', { id: uuidv4(), name: 'Jane Doe', email: 'jane@gmail.com', phoneNumber: '9876543210' });
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', (schema: any) => {
      return schema.users.all();
    });

    this.post('/users', (schema: any, request) => {
      const attrs = JSON.parse(request.requestBody);
      attrs.id = uuidv4();
      return schema.users.create(attrs);
    });
  },
});
}

export default createMockServer;
