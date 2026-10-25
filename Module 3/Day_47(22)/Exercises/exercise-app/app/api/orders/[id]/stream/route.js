export async function GET(request, { params }) {
  const { id } = await params;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Initial state
      send({ status: "Preparing", step: 1, time: new Date().toISOString() });

      // Simulated updates
      const t1 = setTimeout(() => {
        send({ status: "On the way", step: 2, time: new Date().toISOString() });
      }, 3000);

      const t2 = setTimeout(() => {
        send({ status: "Delivered", step: 3, time: new Date().toISOString() });
        controller.close();
      }, 7000);

      request.signal.addEventListener("abort", () => {
        clearTimeout(t1);
        clearTimeout(t2);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
