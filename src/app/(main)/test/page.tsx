"use client";

export default function page() {
  return (
    <main className="p-8">
      <button
        style={{
          width: 200,
          height: 100,
          background: "red",
          color: "white",
          fontSize: 24,
        }}
        onClick={() => alert("click")}
        onTouchStart={() => alert("touchstart")}
        onTouchEnd={() => alert("touchend")}
      >
        TEST
      </button>
    </main>
  );
}
