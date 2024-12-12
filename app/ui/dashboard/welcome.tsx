'use server'
import { getSession } from "@/app/lib/session";
import { playfair } from '@/app/ui/fonts';
import { WelcomeDashboard } from "./welcomeSign";



export default async function GetUserWelcome (){
    let userInfo = await getSession()
    let user: { name: string } = { name: '' };
   if (userInfo !== undefined) {
      user = JSON.parse(JSON.stringify(userInfo))
   }

   console.log(user);
   
    return(
        <>
        <WelcomeDashboard name={user.name}/>
        </>
    )
    
    
}
