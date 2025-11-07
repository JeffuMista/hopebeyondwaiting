import Stats from "./stats";
import Goals from "./Goals";
import Action from "./Action";
export default function Body() {
  return (
    <>
      <div className="block text-center my-20 space-y-6">
        <h1 className="text-3xl ">Welcome to Hope Beyond Waiting</h1>
        <h2 className="text-4xl ">
          Cancer is not a Death Sentence. It's care is available and achievable
          for everyone
        </h2>
      </div>
      <Stats />
      <Goals />
      <Action />
    </>
  );
}
