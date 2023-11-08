import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-4 px-6 md:px-12 pt-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Movie App</h1>
        <p className="text-xl text-slate-700">
          Login to the Movie App to search for your favourite movies.
        </p>
      </div>
      <div className="">
        <AuthForm />
      </div>
    </div>
  );
}
