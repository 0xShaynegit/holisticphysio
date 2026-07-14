/* Holistic Physio concept - interactions
   Plain script (no modules) so it also runs from file:// previews. */
(function () {
  "use strict";

  var BOOK_URL = "https://clientportal.zandahealth.com/clientportal/holisticphysioacup";

  /* Escape hatch for screenshot tools and previews: ?noanim renders the
     page fully revealed with instant scrolling. */
  if (window.location.search.indexOf("noanim") !== -1) {
    document.documentElement.classList.add("no-anim");
  }

  /* ---------- Nav: solid background after leaving the hero top ---------- */
  var nav = document.getElementById("nav");
  var sentinel = document.getElementById("hero-sentinel");

  if (nav && sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  } else if (nav) {
    nav.classList.add("is-scrolled");
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Therapies rail ---------- */
  var rail = document.getElementById("care-rail");
  var prevBtn = document.getElementById("rail-prev");
  var nextBtn = document.getElementById("rail-next");

  if (rail && prevBtn && nextBtn) {
    var step = function () {
      var card = rail.querySelector(".care-card");
      return card ? card.getBoundingClientRect().width + 20 : 440;
    };
    prevBtn.addEventListener("click", function () {
      rail.scrollBy({ left: -step(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      rail.scrollBy({ left: step(), behavior: "smooth" });
    });
    var updateRailButtons = function () {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      prevBtn.disabled = rail.scrollLeft <= 2;
      nextBtn.disabled = rail.scrollLeft >= max;
    };
    rail.addEventListener("scroll", updateRailButtons, { passive: true });
    window.addEventListener("resize", updateRailButtons);
    updateRailButtons();
  }

  /* ---------- Conditions widget ---------- */
  var CONDITIONS = [
    {
      name: "Chronic and acute pain",
      desc: "Pain that has settled in, or arrived suddenly, rarely has a single cause. We combine hands-on treatment with acupuncture and movement to calm it down and keep it away.",
      examples: ["Back pain", "Neck pain", "Frozen shoulder", "Sciatica", "Fibromyalgia"],
      therapies: ["Physiotherapy", "Acupuncture", "Clinical Pilates"]
    },
    {
      name: "Sports injuries",
      desc: "From weekend niggles to season-ending tears, the goal is the same: heal properly, rebuild strength, and return to sport without the injury coming back.",
      examples: ["Ankle sprains", "Knee injuries", "Groin strain", "Muscle and ligament tears"],
      therapies: ["Physiotherapy", "Clinical Pilates", "Acupuncture"]
    },
    {
      name: "Work injuries",
      desc: "Repetitive strain and desk-bound postures build up quietly. We treat the injury and correct the pattern that caused it, with WorkCover claims supported.",
      examples: ["Tennis elbow", "Carpal tunnel", "Shoulder blade pain", "Thumb pain"],
      therapies: ["Physiotherapy", "Acupuncture"]
    },
    {
      name: "Migraines and headaches",
      desc: "Recurring headaches often trace back to the neck, jaw, stress load or internal imbalance. Treating those sources brings relief that painkillers cannot.",
      examples: ["Migraines", "Tension headaches", "Dizziness", "Vertigo"],
      therapies: ["Acupuncture", "Physiotherapy", "Chinese Herbal Medicine"]
    },
    {
      name: "Stress, anxiety and depression",
      desc: "The body keeps the score: tight shoulders, poor sleep, a racing mind. Acupuncture and herbal medicine help settle the nervous system so you can cope well again.",
      examples: ["Panic attacks", "Poor sleep", "Tension", "Low mood"],
      therapies: ["Acupuncture", "Chinese Herbal Medicine"]
    },
    {
      name: "Chronic fatigue",
      desc: "Tired no matter how much you rest? We look at the whole picture, digestion, sleep, stress and constitution, and rebuild your energy from the foundations.",
      examples: ["Constant tiredness", "No energy through the day", "Post-viral fatigue"],
      therapies: ["Chinese Herbal Medicine", "Acupuncture"]
    },
    {
      name: "Women's health",
      desc: "Care through every stage: painful periods, hormonal swings, pregnancy, post-natal recovery and menopause, treated gently and holistically.",
      examples: ["PMT", "Period pain", "Menopause", "Pregnancy care", "Post-natal care"],
      therapies: ["Acupuncture", "Chinese Herbal Medicine", "Clinical Pilates"]
    },
    {
      name: "Digestive issues",
      desc: "Digestion is central to how you feel every day. Herbal formulas and acupuncture work on the gut directly rather than just masking the discomfort.",
      examples: ["Irritable bowel syndrome", "Bloating", "Stomach pain"],
      therapies: ["Chinese Herbal Medicine", "Acupuncture"]
    },
    {
      name: "Fertility",
      desc: "Support for natural conception and alongside IVF: balancing hormones, improving circulation and lowering stress to give you the best possible chance.",
      examples: ["Natural conception", "IVF support", "Hormonal balance"],
      therapies: ["Fertility Acupuncture", "Chinese Herbal Medicine"]
    }
  ];

  var pillsWrap = document.getElementById("condition-pills");
  var cpTitle = document.getElementById("cp-title");
  var cpDesc = document.getElementById("cp-desc");
  var cpExamples = document.getElementById("cp-examples");
  var cpTherapies = document.getElementById("cp-therapies");

  if (pillsWrap && cpTitle) {
    var renderCondition = function (index) {
      var c = CONDITIONS[index];
      cpTitle.textContent = c.name;
      cpDesc.textContent = c.desc;
      cpExamples.innerHTML = "";
      c.examples.forEach(function (ex) {
        var li = document.createElement("li");
        li.textContent = ex;
        cpExamples.appendChild(li);
      });
      cpTherapies.innerHTML = "";
      c.therapies.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        cpTherapies.appendChild(li);
      });
      pillsWrap.querySelectorAll(".pill").forEach(function (btn, i) {
        btn.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
    };

    CONDITIONS.forEach(function (c, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pill";
      btn.textContent = c.name;
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () {
        renderCondition(i);
      });
      pillsWrap.appendChild(btn);
    });

    renderCondition(0);
  }

  /* ---------- Locations widget ---------- */
  var SUBURBS = [
    ["West End", 4], ["Dutton Park", 4], ["South Brisbane", 5],
    ["Fairfield", 6], ["Annerley", 6], ["Woolloongabba", 7],
    ["East Brisbane", 8], ["Milton", 8], ["Kangaroo Point", 9],
    ["Yeronga", 9], ["Spring Hill", 9], ["St Lucia", 10],
    ["Toowong", 10], ["Coorparoo", 10], ["Stones Corner", 10],
    ["Paddington", 10], ["Fortitude Valley", 10], ["Greenslopes", 11],
    ["Tarragindi", 11], ["Moorooka", 11], ["New Farm", 12],
    ["Holland Park", 12], ["Salisbury", 13], ["Sherwood", 13],
    ["Indooroopilly", 13], ["Graceville", 14], ["Corinda", 15]
  ];

  var suburbWrap = document.getElementById("suburb-pills");
  var distValue = document.getElementById("distance-value");
  var distNote = document.getElementById("distance-note");

  if (suburbWrap && distValue) {
    SUBURBS.forEach(function (entry) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pill";
      btn.textContent = entry[0];
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () {
        suburbWrap.querySelectorAll(".pill").forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        distValue.innerHTML =
          "~" + entry[1] + ' <span class="accent">min drive</span>';
        distNote.textContent =
          "Approximate drive from " + entry[0] + " to the clinic, outside peak times.";
      });
      suburbWrap.appendChild(btn);
    });
  }

  /* ---------- FAQ: close others when one opens ---------- */
  var faqItems = document.querySelectorAll(".faq-list details");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });
})();
