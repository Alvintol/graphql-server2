const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const { GraphQLSchema } = require('graphql');
const { RootQueryType, RootMutationType } = require('./types/types');
const app = express();


const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(5000, () => console.log('Server Running...'));