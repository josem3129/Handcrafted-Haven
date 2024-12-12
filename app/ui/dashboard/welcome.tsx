import { getSession } from "@/app/lib/session";
import { playfair } from '@/app/ui/fonts';


export default async function GetUserWelcome (){
    let userInfo = await getSession()
    let user: { name: string } = { name: '' };
   if (userInfo !== undefined) {
      user = JSON.parse(JSON.stringify(userInfo))
   }else{
    user = {name: 'user'}
   }

   console.log(user.name);
   
    return(
        <>
        <WelcomeDashboard name={user.name}/>
        </>
    )
    
    
}
export function WelcomeDashboard({
    name,
  }: {
    name: string;
  }) {

    return (
      <div>
        <h1 className={`${playfair.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
        <h2 className={`${playfair.className} mb-4 text-xl md:text-2xl`}>Welcome {name}</h2>
      </div>
    );
  }
  
