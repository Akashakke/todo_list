import Image from "next/image";
import Todos from "./components/Todo";

export default function Home() {
  return (
   <main className="md:w-fit m-auto">

    <Todos/>
   </main>
  );
}
