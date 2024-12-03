import { getSession } from "@/lib/session";


export default async function GetUserWelcome (){
    const userInfo = await getSession()
   
   const user = JSON.parse(JSON.stringify(userInfo))
    return(
        <>
        <WelcomeDashboard name={user.name} tear={user.tear}/>
        </>
    )
    
    
}
export function WelcomeDashboard({
    name,
    tear,
  }: {
    name: string;
    tear: string;
  }) {

    return (
      <div>
        <h1>Welcome {name} your a {tear}</h1>
      </div>
    );
  }
  
