export default function WelcomeHeader() {
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <section className="mb-8">
      <h1 className="text-4xl font-bold tracking-tight">
        {greeting}, Keerthi 👋
      </h1>

      <p className="mt-2 text-muted-foreground text-lg">
        Ready to become 1% better today?
      </p>
    </section>
  );
}