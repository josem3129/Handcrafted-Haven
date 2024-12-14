import { playfair } from "../fonts";

export function WelcomeDashboard({
    name,
  }: {
    name: string;
  }) {

    if (name === undefined) {
        return (
            <div>
              <h1 className={`${playfair.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            </div>
          );
    }
    return (
      <div>
        <h1 className={`${playfair.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
        <h2 className={`${playfair.className} mb-4 text-xl md:text-2xl`}>Welcome {name}</h2>
      </div>
    );
  }
  
