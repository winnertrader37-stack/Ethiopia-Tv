"use strict";

/* =========================================================
   NAOL ETHIOPIA TV LIVE
   Channel Directory + Search + Category + Live Player
   Version: 3.0
   ========================================================= */

/*
  IMPORTANT:
  - officialUrl: Official broadcaster website or channel page.
  - embedUrl: Only a verified, authorized embed URL.
  - Empty embedUrl means the official page opens instead.
  - A normal website URL is NOT necessarily a video stream URL.
*/


/* =========================================================
   1. CHANNEL DATABASE
   ========================================================= */

const naolChannels = [

  // -------------------------------------------------------
  // ETHIOPIAN TV CHANNELS
  // -------------------------------------------------------

  {
    id: "etv-oromoo",
    name: "ETV Afaan Oromoo",
    category: "Ethiopia",
    description: "Oduu fi sagantaalee Afaan Oromoo.",
    logo: "🇪🇹",
    officialUrl: "https://www.youtube.com/@etvafaanoromoo/live",
    embedUrl: ""
  },

  {
    id: "ebc-world",
    name: "EBC World",
    category: "Ethiopia",
    description: "Oduu Itoophiyaa fi addunyaa.",
    logo: "🇪🇹",
    officialUrl: "https://www.youtube.com/@EBCworld",
    embedUrl: ""
  },

  {
    id: "etv-entertainment",
    name: "ETV Entertainment",
    category: "Entertainment",
    description: "Bashannana fi sagantaalee garaagaraa.",
    logo: "🎬",
    officialUrl: "https://www.youtube.com/@ebcentertainment3193",
    embedUrl: ""
  },

  {
    id: "fana-tv",
    name: "Fana TV",
    category: "Ethiopia",
    description: "Oduu fi sagantaalee Itoophiyaa.",
    logo: "📺",
    officialUrl: "https://www.fanamc.com/english/live/",
    embedUrl: ""
  },

  {
    id: "obn",
    name: "OBN Oromiyaa",
    category: "Ethiopia",
    description: "Oduu fi sagantaalee Oromiyaa.",
    logo: "🌳",
    officialUrl: "https://www.youtube.com/@OBNoromiyaa/live",
    embedUrl: ""
  },

  {
    id: "amhara-media",
    name: "Amhara Media",
    category: "Ethiopia",
    description: "Oduu fi sagantaalee naannoo Amaaraa.",
    logo: "🇪🇹",
    officialUrl: "https://www.ameco.et/",
    embedUrl: ""
  },

  {
    id: "amn",
    name: "Addis Media Network",
    category: "Ethiopia",
    description: "Oduu fi sagantaalee Addis Ababa.",
    logo: "🏙️",
    officialUrl: "https://www.amn.gov.et/",
    embedUrl: ""
  },

  {
    id: "ebc",
    name: "EBC Official",
    category: "Ethiopia",
    description: "Tamsaasa fi oduu Itoophiyaa.",
    logo: "📡",
    officialUrl: "https://www.ebc.et/",
    embedUrl: ""
  },


  // -------------------------------------------------------
  // INTERNATIONAL NEWS CHANNELS
  // -------------------------------------------------------

  {
    id: "aljazeera",
    name: "Al Jazeera English",
    category: "News",
    description: "Oduu addunyaa fi taateewwan kallattiin.",
    logo: "🌍",
    officialUrl: "https://www.aljazeera.com/video/live/",
    embedUrl: ""
  },

  {
    id: "sky-news",
    name: "Sky News",
    category: "News",
    description: "Oduu addunyaa fi taateewwan haaraa.",
    logo: "📰",
    officialUrl: "https://news.sky.com/watch-live",
    embedUrl: ""
  },

  {
    id: "euronews",
    name: "Euronews",
    category: "News",
    description: "Oduu, dinagdee fi siyaasaa.",
    logo: "🌐",
    officialUrl: "https://www.euronews.com/live",
    embedUrl: ""
  },

  {
    id: "trt-world",
    name: "TRT World",
    category: "News",
    description: "Oduu addunyaa.",
    logo: "🌍",
    officialUrl: "https://www.trtworld.com/",
    embedUrl: ""
  },

  {
    id: "france24",
    name: "France 24 English",
    category: "News",
    description: "Oduu addunyaa Afaan Ingiliffaan.",
    logo: "🇫🇷",
    officialUrl: "https://www.france24.com/en/live",
    embedUrl: ""
  },

  {
    id: "aljazeera-mubasher",
    name: "Al Jazeera Mubasher",
    category: "News",
    description: "Taateewwan kallattiin fi oduu.",
    logo: "📡",
    officialUrl: "https://network.aljazeera.net/en/channels/aljazeera-mubasher",
    embedUrl: ""
  },

  {
    id: "nhk-world",
    name: "NHK World-Japan",
    category: "News",
    description: "Oduu, aadaa fi jireenya Jaappaan.",
    logo: "🇯🇵",
    officialUrl: "https://www3.nhk.or.jp/nhkworld/",
    embedUrl: ""
  },

  {
    id: "cgtn",
    name: "CGTN",
    category: "News",
    description: "Oduu Chaayinaa fi addunyaa.",
    logo: "🌏",
    officialUrl: "https://www.cgtn.com/",
    embedUrl: ""
  },

  {
    id: "dw-news",
    name: "DW News",
    category: "News",
    description: "Oduu addunyaa.",
    logo: "📰",
    officialUrl: "https://www.dw.com/en/live-tv/s-100825",
    embedUrl: ""
  },


  // -------------------------------------------------------
  // SPORTS, ENTERTAINMENT AND SCIENCE
  // -------------------------------------------------------

  {
    id: "fifa-plus",
    name: "FIFA+",
    category: "Sports",
    description: "Kubbaa miilaa fi taphoota filataman.",
    logo: "⚽",
    officialUrl: "https://www.plus.fifa.com/",
    embedUrl: ""
  },

  {
    id: "redbull-tv",
    name: "Red Bull TV",
    category: "Sports",
    description: "Ispoortii, dorgommii fi bashannana.",
    logo: "🏎️",
    officialUrl: "https://www.redbull.com/int-en/tv",
    embedUrl: ""
  },

  {
    id: "olympics",
    name: "Olympics",
    category: "Sports",
    description: "Olompikii fi sagantaalee ispoortii.",
    logo: "🏅",
    officialUrl: "https://olympics.com/en/watch",
    embedUrl: ""
  },

  {
    id: "nasa",
    name: "NASA Live",
    category: "Science",
    description: "Saayinsii, hawaa fi qorannoo.",
    logo: "🚀",
    officialUrl: "https://www.nasa.gov/live/",
    embedUrl: ""
  }

];


/* =========================================================
   2. HTML ELEMENTS
   ========================================================= */

const naolGetElement = (id) => document.getElementById(id);


/* =========================================================
   3. SAFE TEXT HELPER
   ========================================================= */

function naolEscapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
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


/* =========================================================
   4. PLAYER MESSAGE
   ========================================================= */

function naolShowPlayerMessage(channel, message) {
  const placeholder = naolGetElement("playerPlaceholder");

  if (!placeholder) {
    return;
  }

  placeholder.style.display = "flex";

  placeholder.innerHTML = `
    <div class="naol-player-message">

      <div class="naol-player-logo">
        ${naolEscapeHTML(channel.logo)}
      </div>

      <h3>${naolEscapeHTML(channel.name)}</h3>

      <p>${naolEscapeHTML(message)}</p>

      <button
        type="button"
        id="naolOfficialWatchButton"
        class="watch-official-button"
      >
        ▶ WATCH LIVE / OFFICIAL PAGE
      </button>

    </div>
  `;

  const button = naolGetElement("naolOfficialWatchButton");

  if (button) {
    button.addEventListener("click", () => {
      naolOpenOfficialChannel(channel.id);
    });
  }
}


/* =========================================================
   5. OPEN OFFICIAL CHANNEL PAGE
   ========================================================= */

function naolOpenOfficialChannel(channelId) {
  const channel = naolChannels.find(
    (item) => item.id === channelId
  );

  if (!channel || !channel.officialUrl) {
    console.error("Official channel URL is unavailable.");
    return;
  }

  try {
    const url = new URL(channel.officialUrl);

    // Only allow HTTPS destinations.
    if (url.protocol !== "https:") {
      console.error("Blocked non-HTTPS channel URL.");
      return;
    }

    window.open(url.href, "_blank", "noopener,noreferrer");

  } catch (error) {
    console.error("Invalid official channel URL:", error);
  }
}


/* =========================================================
   6. PLAY CHANNEL
   ========================================================= */

function naolPlayChannel(channelId) {
  const channel = naolChannels.find(
    (item) => item.id === channelId
  );

  if (!channel) {
    console.error("Channel not found:", channelId);
    return;
  }

  const videoPlayer = naolGetElement("videoPlayer");
  const embedPlayer = naolGetElement("embedPlayer");
  const playerTitle = naolGetElement("playerTitle");
  const playerDescription = naolGetElement("playerDescription");
  const playerStatus = naolGetElement("playerStatus");
  const playerNotice = naolGetElement("playerNotice");
  const videoContainer = naolGetElement("videoContainer");

  if (playerTitle) {
    playerTitle.textContent = channel.name;
  }

  if (playerDescription) {
    playerDescription.textContent = channel.description;
  }

  if (playerStatus) {
    playerStatus.textContent = "Opening channel...";
  }

  if (videoContainer) {
    videoContainer.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Stop any previous HTML video.
  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();
    videoPlayer.style.display = "none";
  }

  /*
    If a verified and authorized embed URL is configured,
    display it inside the website.
  */

  if (channel.embedUrl) {
    if (!embedPlayer) {
      naolShowPlayerMessage(
        channel,
        "The player element is missing. Open the official channel below."
      );

      if (playerStatus) {
        playerStatus.textContent = "Official channel available";
      }

      return;
    }

    try {
      const embedURL = new URL(channel.embedUrl);

      if (embedURL.protocol !== "https:") {
        throw new Error("Embed URL must use HTTPS.");
      }

      embedPlayer.src = embedURL.href;
      embedPlayer.title = channel.name + " live stream";
      embedPlayer.style.display = "block";

      embedPlayer.setAttribute(
        "allow",
        "autoplay; encrypted-media; fullscreen; picture-in-picture"
      );

      embedPlayer.setAttribute("allowfullscreen", "");

      const placeholder = naolGetElement("playerPlaceholder");

      if (placeholder) {
        placeholder.style.display = "none";
      }

      if (playerStatus) {
        playerStatus.textContent = "Loading player...";
      }

      if (playerNotice) {
        playerNotice.textContent =
          "If playback fails, the broadcaster may restrict embedding.";
      }

      return;

    } catch (error) {
      console.error("Embed setup failed:", error);

      if (embedPlayer) {
        embedPlayer.removeAttribute("src");
        embedPlayer.style.display = "none";
      }

      naolShowPlayerMessage(
        channel,
        "Embed playback is unavailable. Use the official channel page."
      );

      if (playerStatus) {
        playerStatus.textContent = "Official channel available";
      }

      return;
    }
  }

  /*
    No verified embed URL:
    Show a working official-page button instead of
    the old "stream not configured" error.
  */

  if (embedPlayer) {
    embedPlayer.removeAttribute("src");
    embedPlayer.style.display = "none";
  }

  naolShowPlayerMessage(
    channel,
    "Tamsaasa kana fuula channel ofiisaa irratti ilaaluuf button armaan gadii tuqi."
  );

  if (playerStatus) {
    playerStatus.textContent = "Official channel";
  }

  if (playerNotice) {
    playerNotice.textContent =
      "Embedded playback is not configured for this channel.";
  }
}


/* =========================================================
   7. CREATE CHANNEL CARD
   ========================================================= */

function naolCreateChannelCard(channel) {
  const card = document.createElement("article");

  card.className = "channel-card";
  card.dataset.channelId = channel.id;
  card.dataset.category = channel.category;

  card.innerHTML = `
    <div class="channel-card-logo">
      ${naolEscapeHTML(channel.logo)}
    </div>

    <div class="channel-card-content">

      <h3>${naolEscapeHTML(channel.name)}</h3>

      <p>${naolEscapeHTML(channel.description)}</p>

      <span class="channel-category-label">
        ${naolEscapeHTML(channel.category)}
      </span>

      <button
        type="button"
        class="watch-button"
        data-channel-id="${naolEscapeHTML(channel.id)}"
      >
        ▶ WATCH LIVE
      </button>

    </div>
  `;

  const watchButton = card.querySelector(".watch-button");

  watchButton.addEventListener("click", () => {
    naolPlayChannel(channel.id);
  });

  return card;
}


/* =========================================================
   8. RENDER CHANNELS
   ========================================================= */

function naolRenderChannels(channelList = naolChannels) {
  const grid = naolGetElement("channelGrid");
  const emptyState = naolGetElement("emptyState");

  if (!grid) {
    console.error(
      'HTML element "channelGrid" hin jiru. index.html keessatti ID kana mirkaneessi.'
    );

    return;
  }

  grid.replaceChildren();

  if (channelList.length === 0) {
    if (emptyState) {
      emptyState.style.display = "block";
    }

    return;
  }

  if (emptyState) {
    emptyState.style.display = "none";
  }

  const fragment = document.createDocumentFragment();

  channelList.forEach((channel) => {
    fragment.appendChild(
      naolCreateChannelCard(channel)
    );
  });

  grid.appendChild(fragment);
}


/* =========================================================
   9. SEARCH AND CATEGORY FILTER
   ========================================================= */

function naolFilterChannels() {
  const searchInput = naolGetElement("channelSearch");
  const categorySelect = naolGetElement("channelCategory");

  const searchText = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const selectedCategory = categorySelect
    ? categorySelect.value
    : "all";

  const filteredChannels = naolChannels.filter((channel) => {
    const matchesSearch =
      channel.name.toLowerCase().includes(searchText) ||
      channel.description.toLowerCase().includes(searchText) ||
      channel.category.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      channel.category.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  naolRenderChannels(filteredChannels);
}


/* =========================================================
   10. FULLSCREEN PLAYER
   ========================================================= */

function naolToggleFullscreen() {
  const container = naolGetElement("videoContainer");

  if (!container) {
    alert("Player container hin argamne.");
    return;
  }

  if (!document.fullscreenElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen().catch((error) => {
        console.error("Fullscreen error:", error);
      });
    } else {
      alert("Fullscreen browser kana irratti hin deeggaramu.");
    }

  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}


/* =========================================================
   11. ROTATE SCREEN
   ========================================================= */

async function naolRotateScreen() {
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock("landscape");
    } else {
      alert(
        "Rotation lock browser kana irratti hin deeggaramu. Bilbila kee gara landscape geeddari."
      );
    }

  } catch (error) {
    console.warn("Screen rotation could not be locked:", error);

    alert(
      "Browser ykn bilbilli kee rotation lock hin hayyamne. Bilbila kee harkaan gara landscape geeddari."
    );
  }
}


/* =========================================================
   12. INITIALIZE WEBSITE
   ========================================================= */

function naolInitializeTV() {
  // Render all 20 channels.
  naolRenderChannels();

  // Search input.
  const searchInput = naolGetElement("channelSearch");

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      naolFilterChannels
    );
  }

  // Category dropdown.
  const categorySelect = naolGetElement("channelCategory");

  if (categorySelect) {
    categorySelect.addEventListener(
      "change",
      naolFilterChannels
    );
  }

  // Fullscreen button.
  const fullscreenButton = naolGetElement("fullscreenButton");

  if (fullscreenButton) {
    fullscreenButton.addEventListener(
      "click",
      naolToggleFullscreen
    );
  }

  // Rotate button.
  const rotateButton = naolGetElement("rotateButton");

  if (rotateButton) {
    rotateButton.addEventListener(
      "click",
      naolRotateScreen
    );
  }

  // Current year, if the footer has this element.
  const currentYear = naolGetElement("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  console.log(
    "Naol Ethiopia TV Live initialized:",
    naolChannels.length,
    "channels loaded."
  );
}


/* =========================================================
   13. START
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    naolInitializeTV
  );
} else {
  naolInitializeTV();
}
