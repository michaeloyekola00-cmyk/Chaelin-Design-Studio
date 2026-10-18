// Chaelin Design Studio — small site script (no dependencies)
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Year in footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Prefill the service field from ?service= in the URL (used by plan buttons)
  var params = new URLSearchParams(location.search);
  var svc = params.get('service');
  var sel = document.querySelector('select[name="interest"]');
  if (svc && sel) {
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === svc) sel.selectedIndex = i;
    }
  }

  // Prefill the website field from ?website= (used by the free score box)
  var web = params.get('website');
  var wf = document.querySelector('form[data-ajax] input[name="website"]');
  if (web && wf) {
    web = web.trim();
    if (!/^https?:\/\//i.test(web)) web = 'https://' + web;
    wf.value = web;
    var nf = document.querySelector('form[data-ajax] input[name="name"]');
    if (nf && !document.querySelector('.instant')) nf.focus({ preventScroll: true });
  }

  // ---------------------------------------------------------------- Instant website check (Google PageSpeed Insights)
  var box = document.querySelector('.instant');
  if (box) {
    var key = box.getAttribute('data-psi-key') || '';
    var out = box.querySelector('.instant-out');
    var iform = box.querySelector('.instant-form');
    var iinput = iform.querySelector('input');
    // Plain-English versions of Google's checks that matter for leads
    var CHECKS = {
      'viewport': 'Not set up properly for phone screens',
      'document-title': 'The page has no proper title in Google',
      'meta-description': 'No description for Google search results',
      'is-crawlable': 'Google may be blocked from showing this page',
      'largest-contentful-paint': 'The main content is slow to appear on a phone',
      'render-blocking-resources': 'Files are slowing down the first view',
      'uses-optimized-images': 'Images are heavier than they need to be',
      'modern-image-formats': 'Images could load much faster',
      'uses-responsive-images': 'Images are too large for phone screens',
      'target-size': 'Buttons and links are too small to tap easily',
      'tap-targets': 'Buttons and links are too small to tap easily',
      'color-contrast': 'Some text is hard to read',
      'image-alt': 'Images have no descriptions (hurts Google and accessibility)',
      'link-text': 'Some links don\'t say where they go',
      'errors-in-console': 'The page shows technical errors',
      'is-on-https': 'The site isn\'t fully secure (https)'
    };
    function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
    function norm(u) { u = (u || '').trim(); if (!u) return ''; if (!/^https?:\/\//i.test(u)) u = 'https://' + u; return u; }
    function col(v) { return v >= 90 ? '#16A34A' : v >= 50 ? '#F59E0B' : '#DC2626'; }
    function pct(c) { return c && typeof c.score === 'number' ? Math.round(c.score * 100) : null; }
    function fail(msg) {
      out.innerHTML = '<p><b>We couldn\'t run the instant check just now.</b></p><p style="color:var(--mute);margin-top:6px">' + esc(msg) +
        ' No problem: send the form below and we\'ll check your website by hand within 48 hours.</p><p style="margin-top:14px"><a class="btn btn-primary arrow" href="#form">Get my free Lead Leak Score</a></p>';
    }
    function run(url) {
      out.hidden = false;
      out.innerHTML = '<div class="instant-load"><div class="spin"></div><div><b>Checking ' + esc(url) + '…</b><span class="msg">Loading your site on a phone, like a customer would.</span></div></div>';
      var msgs = ['Measuring how fast it loads…', 'Checking Google basics…', 'Checking it on a small screen…', 'Almost done…'], mi = 0;
      var tick = setInterval(function () { var m = out.querySelector('.msg'); if (m && mi < msgs.length) m.textContent = msgs[mi++]; }, 7000);
      var api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?strategy=mobile&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES&url=' + encodeURIComponent(url);
      if (key && key.indexOf('YOUR_') !== 0) api += '&key=' + encodeURIComponent(key);
      fetch(api).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          clearInterval(tick);
          if (!res.ok || !res.j.lighthouseResult) {
            var m = res.j && res.j.error && res.j.error.message || '';
            fail(/quota|429/i.test(m) ? 'Our checker is busy right now.' : /FAILED_DOCUMENT_REQUEST|ERRORED_DOCUMENT|DNS|unreachable/i.test(m) ? 'Google couldn\'t open that address. Check it\'s typed correctly.' : 'Something went wrong.');
            return;
          }
          var lh = res.j.lighthouseResult, c = lh.categories, a = lh.audits || {};
          var P = pct(c.performance), S = pct(c.seo), A = pct(c.accessibility), B = pct(c['best-practices']);
          var parts = [[P, .4], [S, .3], [A, .15], [B, .15]], tot = 0, w = 0;
          parts.forEach(function (x) { if (x[0] !== null) { tot += x[0] * x[1]; w += x[1]; } });
          var score = w ? Math.round(tot / w) : 0;
          var issues = [], seen = {};
          Object.keys(CHECKS).forEach(function (id) {
            var au = a[id]; if (!au || au.score === null || au.score === undefined || au.score >= 0.9) return;
            var txt = CHECKS[id]; if (seen[txt]) return; seen[txt] = 1;
            if (id === 'largest-contentful-paint' && au.displayValue) txt = 'The main content takes ' + au.displayValue + ' to appear on a phone';
            issues.push(txt);
          });
          var hid = document.querySelector('form[data-ajax] input[name="instant_score"]');
          if (hid) hid.value = score + '/100 (speed ' + P + ', SEO ' + S + ', accessibility ' + A + ', best practices ' + B + ')';
          var wf = document.querySelector('form[data-ajax] input[name="website"]'); if (wf && !wf.value) wf.value = url;
          function bar(label, v) { return v === null ? '' : '<div class="bar" style="--c:' + col(v) + '"><span>' + label + '</span><span class="t"><i style="width:' + v + '%"></i></span><em>' + v + '</em></div>'; }
          var list = issues.length ? issues.slice(0, 6).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') : '<li class="ok">No big website problems found. Your leaks are more likely in Google, reviews or follow-up.</li>';
          out.innerHTML = '<div class="res"><div><div class="ring" style="--v:' + score + ';--c:' + col(score) + '"><div><div><strong>' + score + '</strong><span>Website score</span></div></div></div><p class="res-site">' + esc(url.replace(/^https?:\/\//, '').replace(/\/$/, '')) + '<br>checked on a phone</p></div>' +
            '<div><div class="bars">' + bar('Speed', P) + bar('Google basics', S) + bar('Easy to use', A) + bar('Technical health', B) + '</div>' +
            '<div class="issues"><h3>' + (issues.length ? 'What\'s costing you leads' : 'Good news') + '</h3><ul>' + list + '</ul></div>' +
            '<div class="res-next"><b>This is only the website part.</b><p>Your full Lead Leak Score out of 100 also covers your Google profile, reviews, how easy you are to contact, and how fast you reply to enquiries. Free, within 48 hours.</p><a class="btn btn-primary arrow" href="#form">Get my full Lead Leak Score</a></div></div></div>';
        })
        .catch(function () { clearInterval(tick); fail('The connection timed out.'); });
    }
    iform.addEventListener('submit', function (e) { e.preventDefault(); var u = norm(iinput.value); if (!u) { iinput.focus(); return; } run(u); });
    var startUrl = norm(params.get('website'));
    if (startUrl) { iinput.value = startUrl.replace(/^https?:\/\//, ''); run(startUrl); }
  }

  // Forms: send with fetch to the form's action (Formspree or similar), show a thank-you message.
  document.querySelectorAll('form[data-ajax]').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      var action = form.getAttribute('action') || '';
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        // Form endpoint not set up yet: fall back to email so no lead is lost.
        ev.preventDefault();
        var data = new FormData(form), body = '';
        data.forEach(function (v, k) { if (k.charAt(0) !== '_') body += k + ': ' + v + '\n'; });
        location.href = 'mailto:chaelin@chaelinstudios.com?subject=' +
          encodeURIComponent('Website enquiry') + '&body=' + encodeURIComponent(body);
        return;
      }
      ev.preventDefault();
      var b = form.querySelector('button[type="submit"]');
      if (b) { b.disabled = true; b.textContent = 'Sending…'; }
      fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad');
          form.reset();
          var ok = form.querySelector('.form-ok');
          if (ok) ok.style.display = 'block';
          if (b) b.textContent = 'Sent ✓';
        })
        .catch(function () {
          if (b) { b.disabled = false; b.textContent = 'Try again'; }
          alert('Sorry, something went wrong. Please email chaelin@chaelinstudios.com');
        });
    });
  });
})();
