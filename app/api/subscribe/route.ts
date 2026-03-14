export async function POST(req: Request) {
    const form = await req.formData();
    const email = form.get("email");
    const alerts = form.get("alerts") === "on";
    const notes = form.get("notes") === "on";

    if (!email || typeof email !== "string") {
        return new Response("Invalid email", { status: 400 });
    }

    // Optional metadata encoded into referrer for analytics
    const referrer = `https://hydromedon.com?alerts=${alerts}&notes=${notes}`;

    try {
        const res = await fetch("https://journey.hydromedon.com/api/v1/free", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                referrer,
                source: "Hydromedon Website CTA",
            }),
        });

        if (!res.ok) {
            console.error("Substack error:", await res.text());
            return new Response("Subscription failed", { status: 500 });
        }

        console.log("New signup:", { email, alerts, notes });
        return new Response("OK", { status: 200 });
    } catch (err) {
        console.error("Network error:", err);
        return new Response("Subscription failed", { status: 500 });
    }
}
