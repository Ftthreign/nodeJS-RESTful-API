import { app } from "./application/web.js";
import { logger } from "./application/log.js";

app.listen(300, () => {
  logger.info("App Start");
});
