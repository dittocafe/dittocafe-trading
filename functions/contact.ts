export const onRequestPost = async (context) => {
  const formData = await context.request.formData()
  const name = String(formData.get("name") || "")
  const email = String(formData.get("email") || "")
  const message = String(formData.get("message") || "")
  const token = String(formData.get("cf-turnstile-response") || "")
  const honey = String(formData.get("company") || "")

  if (honey) {
    return new Response("Spam blocked", { status: 400 })
  }

  const ip = context.request.headers.get("CF-Connecting-IP") || ""

  const verifyForm = new FormData()
  verifyForm.append("secret", context.env.TURNSTILE_SECRET_KEY)
  verifyForm.append("response", token)
  verifyForm.append("remoteip", ip)

  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: verifyForm,
  })

const verify = await verifyRes.json()
if (!verify.success) {
  return new Response(JSON.stringify(verify, null, 2), {
    status: 400,
    headers: { "content-type": "application/json" },
  })
}

  const mailRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: context.env.CONTACT_TO_EMAIL, name: "DittoCafe" }],
        },
      ],
      from: {
        email: "noreply@trading.dittocafe.com",
        name: "DittoCafe Contact Form",
      },
      reply_to: {
        email,
        name: name || email,
      },
      subject: `New contact from ${name || "visitor"}`,
      content: [
        {
          type: "text/plain",
          value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        },
      ],
    }),
  })

  if (!mailRes.ok) {
    return new Response("Mail send failed", { status: 500 })
  }

  return Response.redirect(`${new URL(context.request.url).origin}/contact-success`, 302)
}