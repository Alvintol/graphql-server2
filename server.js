const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const app = express();

const resolve = () => 'Hello World';

const fields = () => ({
  message: {
    type: GraphQLString,
    resolve
  }
})

const query = new GraphQLObjectType({
  name: 'HelloWorld',
  fields
});

const schema = new GraphQLSchema({ query });

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(5000, () => console.log('Server Running...'));