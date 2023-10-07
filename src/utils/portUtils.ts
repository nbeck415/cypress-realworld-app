import chalk from "chalk";
import detect from "detect-port";

export const frontendPort = process.env.PORT;
export const backendPort = process.env.VITE_BACKEND_PORT;
console.log(`SAME_ORIGIN portutils: ${process.env.SAME_ORIGIN}`)
console.log(`VITE_SAME_ORIGIN portutils: ${process.env.VITE_SAME_ORIGIN}`)
// export const targetUrl = process.env.SAME_ORIGIN?.toLowerCase() === "true" ? "" : `http://localhost:${backendPort}`
export const targetUrl = process.env.VITE_SAME_ORIGIN?.toLowerCase() === "true" ? "" : `http://localhost:${backendPort}`
console.log(`targetUrl: ${targetUrl}`)
console.log(`shipyard domain frontend: ${process.env.SHIPYARD_DOMAIN_FRONTEND}`)

export const getBackendPort = async () => {
  return detect(Number(backendPort))
    .then((_port) => {
      if (Number(backendPort) === _port) {
        console.log(chalk.green(`Backend server running at http://localhost:${backendPort}`));
        return Number(backendPort);
      }

      console.log(
        chalk.red(
          `Failed to start the backend server on port ${backendPort}. \n Starting the backend server on port ${_port}. \n Please update VITE_BACKEND_PORT in the .env file and 'apiUrl' in cypress.json to ${_port}.`
        )
      );
      return _port;
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
};
