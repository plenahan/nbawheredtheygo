export default function Home() {
  return (
    <form className="flex flex-col items-center space-y-5">
      <input className="border-2 border-gray-300" type="text" />
      <button className="rounded-md bg-yellow-100 px-4 py-2 text-black" type="submit">Submit Guess</button>
    </form>
  );
}
