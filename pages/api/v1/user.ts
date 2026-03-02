import { UserController } from "@/controllers";
import { ApiRoute } from "@/server";

const apiRouter = new ApiRoute(
	{ GET: UserController.hello, POST: UserController.getUserByEmail },
	{ db: true }
);

export default apiRouter.getHandler();
