import { USER_KEY } from "@/lib/constants";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/agent")({
  beforeLoad: async () => {
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (user.Role !== "agent") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <div>Hello /agent!</div>,
});
