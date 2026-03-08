export function Watermark({ isPro }: { isPro: boolean }) {
  if (isPro) return null;

  return (
    <div className="text-center mt-12 mb-8">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
        CRIADO COM{" "}
        <a
          href="/"
          target="_blank"
          className="bg-primary text-white px-2 py-0.5 border-2 border-foreground shadow-neo ml-1 inline-block"
        >
          UNILINK
        </a>
      </p>
    </div>
  );
}
