"use server";
import { getSession } from "@/app/lib/session";
import { playfair } from "@/app/ui/fonts";
import { WelcomeDashboard } from "./welcomeSign";
import { fetchUser } from "@/app/lib/data";

export default async function GetUserWelcome() {
  let userInfo = await getSession();
  let user: { id: string } = { id: "" };
  if (userInfo !== undefined) {
    user = JSON.parse(JSON.stringify(userInfo));
  }

  const userName = await fetchUser(user.id);

  return userName.map((userFound: { name: string }) => {
    return (
      <>
        <WelcomeDashboard name={userFound.name} />
      </>
    );
  });
}
