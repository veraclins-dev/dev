export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="container flex w-full gap-4 flex-col h-full my-8 overflow-auto rounded-md bg-card p-4">
      <div id="welcome">
        <h1>
          <span> Hello there, </span>
          Welcome to {title} 👋
        </h1>
      </div>
      This is a playground for testing out new features and components.
    </div>
  );
}

export default NxWelcome;
