"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const PORT = Number(process.env.PORT) || 8080;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    // GQL Server
    const server = new server_1.ApolloServer({
        typeDefs: `
        type Query{
            hello:String
            sayHi(name:String):String
        }`,
        resolvers: {
            Query: {
                hello: () => "Hello World!!",
                sayHi: (_, { name }) => `Hi ${name}`
            }
        }
    });
    // Start GQL Server
    yield server.start();
    app.use(express_1.default.json());
    app.use('/graphql', (0, express4_1.expressMiddleware)(server));
    app.get('/', (req, res) => {
        return res.json({ greet: "Hello World!!" });
    });
    app.listen(PORT, () => {
        console.log("app is listning on PORT: " + PORT);
    });
}))();
