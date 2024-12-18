"use server";
import { getSession } from "@/app/lib/session";
import { WelcomeDashboard } from "./welcomeSign";
import { fetchUserById } from "@/app/lib/data";

export default async function GetUserWelcome() {
  // Fetch session and user info
  const userInfo = await getSession();
  let user: { id: string } = { id: "" };

  if (userInfo !== undefined) {
    user = JSON.parse(JSON.stringify(userInfo));
  }

  // Fetch the user's name using the user ID
  if (!user.id) {
    return <div>Error: User ID is missing!</div>;
  }

  const userName = await fetchUserById(user.id);

  if (userName.length === 0) {
    return <div>Error: User data is not available!</div>;
  }

  // Render the welcome dashboard with the user's name
  return (
    <>
      <WelcomeDashboard key={userName[0].name} name={userName[0].name} />
    </>
  );
}
