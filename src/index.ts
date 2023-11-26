// npm run gemini:prebuild; npm run gemini:build; npm run gemini:prestart; npm run gemini:start
// gemini://localhost:1965/

import { readFileSync } from "fs";
import gemini, { Request, Response, TitanRequest, NextFunction } from "gemini-server";

const options = {
  cert: readFileSync("cert.pem"),
  key: readFileSync("key.pem"),
  titanEnabled: true
};

const app = gemini(options);

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log("Handling path", req.path);
  next();
});

// app.on("/", (_req: Request, res: Response) => {
//   res.file("_gemini/index.gmi");
// });

app.use("/", gemini.serveStatic("./_gemini"));

app.listen(() => {
  console.log("Listening...");
});