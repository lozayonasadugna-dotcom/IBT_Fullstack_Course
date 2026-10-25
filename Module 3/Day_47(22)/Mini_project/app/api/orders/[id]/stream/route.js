export async function GET(request, { params }) {
  const { id } = await params;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data) => {
        // Strict SSE formatting: "data: " + JSON string + "\n\n"
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Step 1: Initial event
      send({ status: "Dispatched", etaMinutes: 15, timestamp: new Date().toISOString() });

      // Step 2: Progress event
      const timer1 = setTimeout(() => {
        send({ status: "Near Destination", etaMinutes: 4, timestamp: new Date().toISOString() });
      }, 4000);

      // Step 3: Delivered event
      const timer2 = setTimeout(() => {
        send({ status: "Delivered", etaMinutes: 0, timestamp: new Date().toISOString() });
        controller.close();
      }, 9000);

      request.signal.addEventListener("abort", () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
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
