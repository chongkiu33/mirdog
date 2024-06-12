import Image from "next/image";
import WaterRipple from './components/WaterRipple';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 mir">
      <WaterRipple />
      <h1 className="mircentered">MIR</h1>
    </main>
  );
}
