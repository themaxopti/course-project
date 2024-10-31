import "./styles/style.scss";
import { router } from "./router/router";
import { requestHandlers } from "./utils/requestHandlers.ts";

async function bootstrap() {
  const token = localStorage.getItem('accessToken');

  if (token) {
    try {
      await requestHandlers.getUser();
      router.resolve();
    } catch {
      router.resolve();
    }
  } else {
    router.resolve();
  }
}

await bootstrap();
