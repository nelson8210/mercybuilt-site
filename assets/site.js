(function () {
  var SUPABASE_URL = "https://wkftusmqasujgqgokpgw.supabase.co";
  var SUPABASE_KEY = "sb_publishable_2kN3iBrnaZ0feEBy_tydhw_6CyaUGx2";
  var sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  var params = new URLSearchParams(location.search);
  var source = (params.get("utm_source") || params.get("src") || document.referrer || "direct").slice(0, 200);
  function val(fd, k) { var v = fd.get(k); v = v == null ? "" : String(v).trim(); return v || null; }

  // Hoodie preorder popup: opens once per browser session, same as the original site.
  var dlg = document.getElementById("hoodie-dialog");
  if (dlg) {
    var close = dlg.querySelector(".hoodie-close");
    if (close) close.addEventListener("click", function () { dlg.close(); });
    var seen = false;
    try { seen = sessionStorage.getItem("mercy-built-hoodie-popup-seen") === "1"; sessionStorage.setItem("mercy-built-hoodie-popup-seen", "1"); } catch (e) {}
    if (!seen && typeof dlg.showModal === "function") { try { dlg.showModal(); } catch (e) {} }
  }

  function status(form, text, isError) {
    var p = form.querySelector(".form-status");
    if (!p) { p = document.createElement("p"); p.className = "form-status"; p.setAttribute("role", isError ? "alert" : "status"); form.appendChild(p); }
    p.textContent = text; p.className = "form-status" + (isError ? " error" : "");
  }

  [].forEach.call(document.querySelectorAll("form.interest-form"), function (form) {
    form.removeAttribute("action");
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn && btn.disabled) return;
      var fd = new FormData(form);
      var type = val(fd, "form_type");
      var email = val(fd, "email");
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { status(form, "Please enter a valid email address.", true); return; }
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Saving…"; }
      var res;
      if (type === "hoodie-preorder") {
        res = await sb.from("mercy_built_preorders").insert({
          product: "2 Corinthians 5:17 hoodie", full_name: val(fd, "name") || "", email: email,
          size: val(fd, "preferred_size"), color: val(fd, "preferred_color"), quantity: 1,
          source: ("homepage-popup | " + source).slice(0, 200)
        });
      } else {
        res = await sb.from("mercy_built_interest").insert({
          form_type: type === "product-interest" ? "product-interest" : "first-drop-updates",
          email: email, name: val(fd, "name"), product_interest: val(fd, "product_interest"),
          preferred_size: val(fd, "preferred_size"), preferred_color: val(fd, "preferred_color"),
          quantity: val(fd, "quantity"), notes: val(fd, "notes"), source: source
        });
      }
      if (btn) { btn.disabled = false; btn.textContent = label; }
      if (res.error) { console.error(res.error); status(form, type === "hoodie-preorder" ? "We couldn’t save your request. Please try again." : "We couldn’t save that. Please try again.", true); return; }
      if (type === "hoodie-preorder") {
        form.outerHTML = '<div role="status"><p>Your preorder request is in. We’ll email you when checkout opens.</p><button class="button" type="button" onclick="this.closest(\'dialog\').close()">Done</button></div>';
      } else {
        form.reset();
        status(form, type === "product-interest" ? "Saved. Thanks for telling us what you want." : "You’re on the list. We’ll keep you updated.", false);
      }
    });
  });
})();
