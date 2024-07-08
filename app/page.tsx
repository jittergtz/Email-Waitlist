import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import { FORMERR } from "dns";
import { div } from "three/examples/jsm/nodes/Nodes.js";


export default function Home() {
  return (
    <div>
    <main className="flex relative min-h-screen flex-col items-center justify-between p-5 sm:p-24">
     <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#AD331A_140%)]"></div>

      <Hero/>
  

    
  

    </main>

    <Footer/>

    </div>
  );
}
