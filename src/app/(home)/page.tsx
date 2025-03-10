import ControlerDescription from "@/app/components/Home/ControlerDescription";
import ControlerIntroduction from "@/app/components/Home/ControlerIntroduction";

export default function Home() {
  return (
    <div className="c-page">
        <ControlerIntroduction />
        <ControlerDescription />
    </div>
  );
}
