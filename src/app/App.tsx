import { AppRouter } from "./AppRouter";
import Navbar from "../features/shared/ui/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
}
