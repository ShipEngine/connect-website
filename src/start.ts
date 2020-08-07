import { server } from "./server";

const port = Number(process.argv[2]) || 3001;
const pathToApp = process.argv[3];

server(port, pathToApp);
