export const AboutIntro = () => {
  return (
    <article className="flex flex-col gap-4">
      <h1 className="head-text">
        Hello I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          AJAY
        </span>{" "}
        <span
          className="blue-gradient_text text-2xl font-semibold drop-shadow font-orbitron transition-all hover:text-glow"
        >
          (AJ)
        </span>
      </h1>
      <p className="text-slate-500">
        {" "}
        Software Engineer based in India,
        passionate about transforming ideas into interactive, user-friendly web applications.
      </p>
    </article>
  );
};
