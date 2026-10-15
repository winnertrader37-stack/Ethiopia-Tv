"use strict";

/* =========================================================
   NAOL ETHIOPIA TV LIVE
   Embedded YouTube Live Player
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const channels = [
    {
      id: 1,
      name: "iShowSpeed",
      category: "Entertainment",
      url: "https://www.youtube.com/live/L6S9Vb3RLy4?si=elAPwKyW2b7byZOb",
      embedUrl: "https://www.youtube.com/embed/L6S9Vb3RLy4"
    },
    {
      id: 2,
      name: "Agenda Free TV",
      category: "News",
      url: "https://www.youtube.com/live/jiPKCB7ESfA?si=uE2m2pwax6oWsBwq",
      embedUrl: "https://www.youtube.com/embed/jiPKCB7ESfA"
    },
    {
      id: 3,
      name: "India TV",
      category: "News",
      url: "https://www.youtube.com/live/MadvVbc789Q?si=6dCemmPNMAOr06TG",
      embedUrl: "https://www.youtube.com/embed/MadvVbc789Q"
    },
    {
      id: 4,
      name: "NBC",
      category: "News",
      url: "https://www.youtube.com/live/jcPgeulLxt8?si=Wc-cD-VY7SmHF2j6",
      embedUrl: "https://www.youtube.com/embed/jcPgeulLxt8"
    },
    {
      id: 5,
      name: "Naol Film",
      category: "Movies",
      url: "https://www.youtube.com/live/G43NInZfoPE?si=g_tOzKz7wDULoSvP",
      embedUrl: "https://www.youtube.com/embed/G43NInZfoPE"
    },
    {
      id: 6,
      name: "Film TV",
      category: "Movies",
      url: "https://www.youtube.com/live/cksCV4AUwjs?si=HAUvtCVPfjTxMF6Y",
      embedUrl: "https://www.youtube.com/embed/cksCV4AUwjs"
    },
    {
      id: 7,
      name: "Clipzone",
      category: "Entertainment",
      url: "https://www.youtube.com/live/5PaRAsJ6gI0?si=zjz4K7oyK1klxt19",
      embedUrl: "https://www.youtube.com/embed/5PaRAsJ6gI0"
    },
    {
      id: 8,
      name: "Film One",
      category: "Movies",
      url: "https://www.youtube.com/live/lDgc3QcWa2g?si=i_No1v-2nAaDbQbg",
      embedUrl: "https://www.youtube.com/embed/lDgc3QcWa2g"
    },
    {
      id: 9,
      name: "Mr Bean",
      category: "Comedy",
      url: "https://www.youtube.com/live/oPonPGALYaU?si=Nn6AMTbMJFCdEOn0",
      embedUrl: "https://www.youtube.com/embed/oPonPGALYaU"
    },
    {
      id: 10,
      name: "Breaking News",
      category: "News",
      url: "https://www.youtube.com/live/Uqf67ODWspg?si=mbdfKr7PpxNlCyZX",
      embedUrl: "https://www.youtube.com/embed/Uqf67ODWspg"
    },
    {
      id: 11,
      name: "Citizen TV",
      category: "News",
      url: "https://www.youtube.com/live/1Vm7lAjpZZM?si=Az6Clfq83zaP7Q2A",
      embedUrl: "https://www.youtube.com/embed/1Vm7lAjpZZM"
    },
    {
      id: 12,
      name: "Al Jazeera English",
      category: "News",
      url: "https://www.youtube.com/live/gCNeDWCI0vo?si=3BhmjdvlWXRPDw99",
      embedUrl: "https://www.youtube.com/embed/gCNeDWCI0vo"
    },
    {
      id: 13,
      name: "Sports Live",
      category: "Sports",
      url: "https://www.youtube.com/live/dMeQPf-f4eg?si=snV_oPo4G52i8noE",
      embedUrl: "https://www.youtube.com/embed/dMeQPf-f4eg"
    },
    {
      id: 14,
      name: "Sky News",
      category: "News",
      url: "https://www.youtube.com/live/vq-tKtcc_MI?si=BUOpwsh9S9GKxwAT",
      embedUrl: "https://www.youtube.com/embed/vq-tKtcc_MI"
    }
  ];

  /* ---------------------------------------------------------
     FIND PLAYER ELEMENTS
     --------------------------------------------------------- */

  const player = document.getElementById("embedPlayer");
  const playerTitle = document.getElementById("playerTitle");
  const channelContainer =
    document.getElementById("channelList") ||
    document.getElementById("channelsGrid");

  if (!player) {
    console.error(
      "Naol TV: iframe with id='embedPlayer' was not found. " +
      "Add the player iframe to index.html."
    );
  }

  /* ---------------------------------------------------------
     SAFE HTML TEXT
     --------------------------------------------------------- */

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };

      return entities[character];
    });
  }

  /* ---------------------------------------------------------
     PLAY CHANNEL INSIDE THE WEBSITE
     --------------------------------------------------------- */

  function playChannel(channel) {
    if (!player) {
      alert(
        "Video player hin argamne. " +
        "Maaloo iframe id='embedPlayer' index.html keessatti dabal."
      );
      return;
    }

    player.src =
      channel.embedUrl +
      "?autoplay=1&rel=0&playsinline=1";

    player.title = channel.name + " Live";

    if (playerTitle) {
      playerTitle.textContent = channel.name + " — LIVE";
    }

    document.querySelectorAll(".channel-card").forEach(card => {
      card.classList.remove("active");
    });

    const selectedCard = document.querySelector(
      `.channel-card[data-channel-id="${channel.id}"]`
    );

    if (selectedCard) {
      selectedCard.classList.add("active");
    }

    const playerSection = document.getElementById("livePlayerSection");

    if (playerSection) {
      playerSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  /* ---------------------------------------------------------
     CREATE CHANNEL CARDS
     --------------------------------------------------------- */

  function renderChannels(list = channels) {
    if (!channelContainer) {
      console.error(
        "Naol TV: channel container hin argamne. " +
        "index.html keessatti id='channelList' ykn id='channelsGrid' fayyadami."
      );
      return;
    }

    channelContainer.innerHTML = list.map(channel => `
      <article
        class="channel-card"
        data-channel-id="${channel.id}"
      >
        <div class="channel-card-content">
          <span class="channel-number">
            ${String(channel.id).padStart(2, "0")}
          </span>

          <div class="channel-info">
            <h3>${escapeHTML(channel.name)}</h3>
            <p>${escapeHTML(channel.category)}</p>
            <span class="live-badge">
              <span class="live-dot"></span>
              LIVE CHANNEL
            </span>
          </div>
        </div>

        <button
          class="watch-live-btn"
          type="button"
          data-play-channel="${channel.id}"
        >
          ▶ WATCH LIVE
        </button>
      </article>
    `).join("");
  }

  /* ---------------------------------------------------------
     WATCH BUTTON EVENTS
     --------------------------------------------------------- */

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-play-channel]");

    if (!button) return;

    const channelId = Number(button.dataset.playChannel);

    const channel = channels.find(item => item.id === channelId);

    if (channel) {
      playChannel(channel);
    }
  });

  /* ---------------------------------------------------------
     SEARCH CHANNELS
     --------------------------------------------------------- */

  const searchInput =
    document.getElementById("channelSearch") ||
    document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();

      const filteredChannels = channels.filter(channel => {
        return (
          channel.name.toLowerCase().includes(query) ||
          channel.category.toLowerCase().includes(query)
        );
      });

      renderChannels(filteredChannels);
    });
  }

  /* ---------------------------------------------------------
     CATEGORY FILTERS
     --------------------------------------------------------- */

  document.addEventListener("click", event => {
    const filterButton = event.target.closest("[data-category]");

    if (!filterButton) return;

    const category = filterButton.dataset.category;

    const filteredChannels =
      category === "all"
        ? channels
        : channels.filter(channel => channel.category === category);

    renderChannels(filteredChannels);

    document.querySelectorAll("[data-category]").forEach(button => {
      button.classList.remove("active");
    });

    filterButton.classList.add("active");
  });

  /* ---------------------------------------------------------
     INITIALIZE
     --------------------------------------------------------- */

  renderChannels();

  console.log(
    `Naol Ethiopia TV Live initialized: ${channels.length} channels loaded.`
  );
});
