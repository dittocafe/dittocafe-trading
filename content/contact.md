---
title: Contact
---

# Contact

有事想联系我，可以用下面的表单。

<form action="/contact" method="POST">
  <p>
    <label>Name<br />
    <input type="text" name="name" required /></label>
  </p>

  <p>
    <label>Email<br />
    <input type="email" name="email" required /></label>
  </p>

  <p style="display:none;">
    <label>Company
    <input type="text" name="company" tabindex="-1" autocomplete="off" /></label>
  </p>

  <p>
    <label>Message<br />
    <textarea name="message" rows="8" required></textarea></label>
  </p>

  <div class="cf-turnstile" data-sitekey="你的_SITE_KEY"></div>

  <p>
    <button type="submit">Send</button>
  </p>
</form>

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>