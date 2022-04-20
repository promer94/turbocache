import consola, { FancyReporter } from "consola";

const logger = consola.create({
  reporters: [new FancyReporter()],
});

export { logger };
