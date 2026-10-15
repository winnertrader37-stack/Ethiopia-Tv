"use strict";

/* =====================================================
   NAOL ETHIOPIA TV LIVE
   Channel Search, Player, Favorites and Subscription UI

   IMPORTANT:
   1. Replace example channel URLs with verified,
      authorized live-stream or embed URLs.
   2. Never store secret payment credentials in this file.
   3. Production premium access requires a secure backend.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const $ = (id) => document.getElementById(id);


    /* =================================================
       CONFIGURATION
       ================================================= */

    const CONFIG = {
        paymentNumber: "0908052813",
        paymentEmail: "natidesta67@gmail.com",

        /*
         * Add only authorized and tested stream URLs.
         *
         * type: "video"  = direct media URL
         * type: "embed"  = permitted embed/player URL
         *
         * These sample records intentionally have no stream URL.
         * A channel card is not proof that its live broadcast
         * is available.
         */

        channels: [
            {
                id: "etv-afaan-oromoo",
                name: "ETV Afaan Oromoo",
                shortName: "ETV",
                category: "news",
                description: "Afaan Oromoo television",
                type: "embed",
                streamUrl: ""
            },
            {
                id: "ebc-news",
                name: "EBC News",
                shortName: "EBC",
                category: "news",
                description: "Ethiopian news and information",
                type: "embed",
                streamUrl: ""
            },
            {
                id: "fana-tv",
                name: "Fana TV",
                shortName: "FANA",
                category: "news",
                description: "News and current affairs",
                type: "embed",
                streamUrl: ""
            },
            {
                id: "obn",
                name: "OBN",
                shortName: "OBN",
                category: "regional",
                description: "Oromia Broadcasting Network",
                type: "embed",
                streamUrl: ""
            },
            {
                id: "amhara-tv",
                name: "Amhara TV",
                shortName: "ATV",
                category: "regional",
                description: "Regional television",
                type: "embed",
                streamUrl: ""
            },
            {
                id: "addis-tv",
                name: "Addis TV",
                shortName: "ADDIS",
                category: "entertainment",
                description: "City television programming",
                type: "embed",
                streamUrl: ""
            },
            {
                id: "etv-entertainment",
                name: "ETV Entertainment",
                shortName: "ETVE",
                category: "entertainment",
                description: "Entertainment programming",
                type: "embed",
                streamUrl: ""
            },
            {
                id: "etv-sport",
                name: "ETV Sport",
                shortName: "SPORT",
                category: "sports",
                description: "Sports programming",
                type: "embed",
                streamUrl: ""
            }
        ],

        plans: {
            monthly: {
                name: "Monthly",
                months: 1,
                price: 500
            },

            twoMonths: {
                name: "Two Months",
                months: 2,
                price: 1000
            },

            threeMonths: {
                name: "Three Months",
                months: 3,
                price: 1500
            },

            annual: {
                name: "Annual Premium",
                months: 12,
                price: 6999
            }
        }
    };


    /* =================================================
       STATE
       ================================================= */

    let selectedChannelId = null;
    let selectedPlanId = null;

    let currentChannel = null;


    /* =================================================
       STORAGE HELPERS

       localStorage is for preferences only here.
       It is NOT trusted for paid subscription status.
       ================================================= */

    function readFavorites() {
        try {
            const value = JSON.parse(
                localStorage.getItem("naol_tv_favorites") || "[]"
            );

            return Array.isArray(value) ? value : [];
        } catch (error) {
            return [];
        }
    }


    function saveFavorites(ids) {
        try {
            localStorage.setItem(
                "naol_tv_favorites",
                JSON.stringify(ids)
            );
        } catch (error) {
            console.warn("Could not save favorites.");
        }
    }


    /* =================================================
       CHANNEL ELEMENTS
       ================================================= */

    const channelGrid = $("channelGrid");
    const channelSearch = $("channelSearch");
    const channelCategory = $("channelCategory");
    const channelCount = $("channelCount");
    const emptyState = $("emptyState");

    const playerTitle = $("playerTitle");
    const playerDescription = $("playerDescription");
    const playerStatus = $("playerStatus");
    const playerNotice = $("playerNotice");

    const playerPlaceholder = $("playerPlaceholder");
    const videoPlayer = $("videoPlayer");
    const embedPlayer = $("embedPlayer");
    const videoContainer = $("videoContainer");


    /* =================================================
       NOTICE HELPERS
       ================================================= */

    function setNotice(message, type = "") {
        playerNotice.textContent = message;
        playerNotice.className = "player-notice";

        if (type) {
            playerNotice.classList.add(type);
        }
    }


    function setPlayerStatus(message) {
        playerStatus.textContent = message;
    }


    /* =================================================
       CREATE CHANNEL CARD
       ================================================= */

    function createChannelCard(channel) {
        const card = document.createElement("article");

        card.className = "channel-card";

        if (channel.id === selectedChannelId) {
            card.classList.add("active");
        }

        card.dataset.channelId = channel.id;


        const top = document.createElement("div");
        top.className = "channel-card-top";


        const logo = document.createElement("div");
        logo.className = "channel-logo";
        logo.textContent = channel.shortName;


        const status = document.createElement("span");
        status.className = "channel-live-label";

        /*
         * Do not claim that an unverified stream is live.
         */

        status.textContent = channel.streamUrl
            ? "STREAM"
            : "AVAILABLE SOON";


        top.append(logo, status);


        const title = document.createElement("h3");
        title.textContent = channel.name;


        const description = document.createElement("p");
        description.textContent = channel.description;


        const bottom = document.createElement("div");
        bottom.className = "channel-card-bottom";


        const watchButton = document.createElement("button");

        watchButton.type = "button";
        watchButton.className = "watch-channel-button";

        watchButton.textContent = "▶ Watch";

        watchButton.addEventListener("click", () => {
            selectChannel(channel.id);
        });


        const favoriteButton = document.createElement("button");

        favoriteButton.type = "button";
        favoriteButton.className = "favorite-button";

        favoriteButton.setAttribute(
            "aria-label",
            "Toggle favorite for " + channel.name
        );

        updateFavoriteButton(favoriteButton, channel.id);


        favoriteButton.addEventListener("click", () => {
            toggleFavorite(channel.id);
            updateChannelCards();
        });


        bottom.append(watchButton, favoriteButton);

        card.append(top, title, description, bottom);

        return card;
    }


    /* =================================================
       FAVORITES
       ================================================= */

    function updateFavoriteButton(button, channelId) {
        const favorites = readFavorites();

        const isFavorite = favorites.includes(channelId);

        button.textContent = isFavorite ? "♥" : "♡";

        button.classList.toggle("is-favorite", isFavorite);

        button.setAttribute(
            "aria-pressed",
            String(isFavorite)
        );
    }


    function toggleFavorite(channelId) {
        let favorites = readFavorites();

        if (favorites.includes(channelId)) {
            favorites = favorites.filter(
                id => id !== channelId
            );
        } else {
            favorites.push(channelId);
        }

        saveFavorites(favorites);
    }


    /* =================================================
       SEARCH AND FILTER
       ================================================= */

    function updateChannelCards() {
        if (!channelGrid) return;

        const query = (
            channelSearch.value || ""
        ).trim().toLowerCase();

        const category = channelCategory.value;

        const filteredChannels = CONFIG.channels.filter(channel => {
            const matchesSearch =
                channel.name.toLowerCase().includes(query) ||
                channel.description.toLowerCase().includes(query) ||
                channel.shortName.toLowerCase().includes(query);

            const matchesCategory =
                category === "all" ||
                channel.category === category;

            return matchesSearch && matchesCategory;
        });


        channelGrid.replaceChildren();

        filteredChannels.forEach(channel => {
            channelGrid.appendChild(
                createChannelCard(channel)
            );
        });


        channelCount.textContent =
            filteredChannels.length +
            (filteredChannels.length === 1
                ? " Channel"
                : " Channels");


        emptyState.hidden = filteredChannels.length !== 0;
    }


    channelSearch.addEventListener(
        "input",
        updateChannelCards
    );

    channelCategory.addEventListener(
        "change",
        updateChannelCards
    );


    /* =================================================
       STOP CURRENT PLAYER
       ================================================= */

    function stopCurrentPlayer() {
        try {
            videoPlayer.pause();
        } catch (error) {
            // Ignore pause errors.
        }

        videoPlayer.removeAttribute("src");
        videoPlayer.load();

        videoPlayer.hidden = true;

        /*
         * Clearing the iframe src stops the embedded player.
         */

        embedPlayer.src = "about:blank";
        embedPlayer.hidden = true;

        playerPlaceholder.hidden = false;
    }


    /* =================================================
       SELECT CHANNEL
       ================================================= */

    function selectChannel(channelId) {
        const channel = CONFIG.channels.find(
            item => item.id === channelId
        );

        if (!channel) {
            setNotice("Channel not found.", "error");
            return;
        }


        selectedChannelId = channelId;
        currentChannel = channel;


        playerTitle.textContent = channel.name;

        playerDescription.textContent =
            channel.description;


        updateChannelCards();


        stopCurrentPlayer();

        document.getElementById("watch").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        if (!channel.streamUrl) {
            setPlayerStatus("NOT CONFIGURED");

            setNotice(
                "The live stream for this channel has not been configured. " +
                "Add a verified, authorized stream or permitted embed URL " +
                "in script.js.",
                "error"
            );

            return;
        }


        playerPlaceholder.hidden = true;


        if (channel.type === "video") {
            playDirectVideo(channel);
            return;
        }


        if (channel.type === "embed") {
            playEmbeddedVideo(channel);
            return;
        }


        setPlayerStatus("UNSUPPORTED");

        setNotice(
            "This stream type is not supported.",
            "error"
        );
    }


    /* =================================================
       DIRECT VIDEO PLAYBACK

       Works only with compatible media URLs and server
       configurations. HLS may require an additional
       compatible player library on browsers without
       native HLS support.
       ================================================= */

    function playDirectVideo(channel) {
        videoPlayer.hidden = false;

        videoPlayer.src = channel.streamUrl;

        setPlayerStatus("LOADING");

        setNotice(
            "Loading the authorized stream..."
        );


        videoPlayer.load();


        const playPromise = videoPlayer.play();


        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
                setNotice(
                    "Playback could not start automatically. " +
                    "Press the play button or check whether the " +
                    "stream URL is valid and accessible.",
                    "error"
                );

                setPlayerStatus("READY");
            });
        }
    }


    videoPlayer.addEventListener("playing", () => {
        setPlayerStatus("PLAYING");

        setNotice(
            "The stream is playing.",
            "success"
        );
    });


    videoPlayer.addEventListener("waiting", () => {
        setPlayerStatus("BUFFERING");
    });


    videoPlayer.addEventListener("error", () => {
        setPlayerStatus("STREAM ERROR");

        setNotice(
            "The stream could not be played. Check the URL, " +
            "network connection, CORS policy and media format.",
            "error"
        );
    });


    /* =================================================
       EMBEDDED VIDEO PLAYBACK

       Use only an official or otherwise authorized embed
       URL. Many sites block embedding on other domains.
       ================================================= */

    function playEmbeddedVideo(channel) {
        const url = validateEmbedURL(channel.streamUrl);

        if (!url) {
            playerPlaceholder.hidden = false;

            setPlayerStatus("INVALID URL");

            setNotice(
                "The embed URL is invalid or not on an approved host.",
                "error"
            );

            return;
        }


        embedPlayer.hidden = false;

        setPlayerStatus("LOADING");

        setNotice(
            "Loading the embedded broadcast. Playback depends " +
            "on the provider allowing embedding."
        );


        embedPlayer.src = url;
    }


    function validateEmbedURL(value) {
        try {
            const url = new URL(value);

            if (url.protocol !== "https:") {
                return null;
            }

            /*
             * Configure the allowed embed hosts for your
             * actual providers. Do not accept arbitrary URLs
             * from untrusted users.
             */

            const allowedHosts = [
                "www.youtube-nocookie.com",
                "www.youtube.com",
                "www.youtube.com"
            ];

            if (!allowedHosts.includes(url.hostname)) {
                return null;
            }

            if (
                url.hostname.includes("youtube.com") &&
                url.pathname.startsWith("/embed/")
            ) {
                return url.href;
            }

            if (
                url.hostname === "www.youtube-nocookie.com" &&
                url.pathname.startsWith("/embed/")
            ) {
                return url.href;
            }

            return null;

        } catch (error) {
            return null;
        }
    }


    embedPlayer.addEventListener("load", () => {
        if (!embedPlayer.hidden) {
            setPlayerStatus("EMBED LOADED");

            setNotice(
                "The embed page loaded. Actual playback and " +
                "live availability depend on the provider.",
                "success"
            );
        }
    });


    /* =================================================
       FULL SCREEN
       ================================================= */

    const fullscreenButton = $("fullscreenButton");


    fullscreenButton.addEventListener("click", async () => {
        try {
            const target =
                videoContainer.querySelector(
                    "video:not([hidden]), iframe:not([hidden])"
                ) || videoContainer;


            if (document.fullscreenElement) {
                await document.exitFullscreen();
                return;
            }


            if (target.requestFullscreen) {
                await target.requestFullscreen();
            } else if (videoPlayer.webkitEnterFullscreen) {
                videoPlayer.webkitEnterFullscreen();
            } else {
                setNotice(
                    "Fullscreen is not supported by this browser.",
                    "error"
                );
            }

        } catch (error) {
            setNotice(
                "Could not enter fullscreen. Try your browser's fullscreen controls.",
                "error"
            );
        }
    });


    /* =================================================
       SCREEN ROTATION
       ================================================= */

    const rotateButton = $("rotateButton");


    rotateButton.addEventListener("click", async () => {
        try {
            if (
                screen.orientation &&
                typeof screen.orientation.lock === "function"
            ) {
                await screen.orientation.lock("landscape");

                setNotice(
                    "Landscape mode enabled where supported.",
                    "success"
                );

                return;
            }


            setNotice(
                "Automatic rotation is not supported here. " +
                "Turn on Auto-rotate on your phone and rotate it sideways.",
                "error"
            );

        } catch (error) {
            setNotice(
                "Your browser may require fullscreen or may not " +
                "support screen locking. Enable Auto-rotate and " +
                "turn your phone sideways.",
                "error"
            );
        }
    });


    /* =================================================
       CAST SUPPORT

       The Cast API is not universally available.
       This button detects the API but does not implement
       a complete Chromecast SDK integration.
       ================================================= */

    const castButton = $("castButton");


    castButton.addEventListener("click", () => {
        const castApiAvailable =
            Boolean(
                window.cast &&
                window.cast.framework
            );


        if (castApiAvailable) {
            setNotice(
                "Cast API detected. A configured receiver and " +
                "Cast SDK integration are still required.",
                "success"
            );

            return;
        }


        setNotice(
            "Casting is not configured in this version. " +
            "Use a compatible browser/device casting feature " +
            "or add a supported Cast SDK integration.",
            "error"
        );
    });


    /* =================================================
       MOBILE MENU
       ================================================= */

    const menuButton = $("menuButton");
    const navigation = $("navigation");


    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });


    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });


    /* =================================================
       PREMIUM PLANS
       ================================================= */

    const selectedPlanName = $("selectedPlanName");
    const selectedPlanPrice = $("selectedPlanPrice");

    const emailPaymentButton = $("emailPaymentButton");


    function formatPrice(price) {
        return new Intl.NumberFormat("en-US").format(price) +
            " ETB";
    }


    function selectPlan(planId) {
        const plan = CONFIG.plans[planId];

        if (!plan) return;


        selectedPlanId = planId;


        selectedPlanName.textContent = plan.name;

        selectedPlanPrice.textContent =
            formatPrice(plan.price);


        emailPaymentButton.disabled = false;


        document.querySelectorAll(".plan-button").forEach(button => {
            const isSelected =
                button.dataset.plan === planId;

            button.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

            button.textContent = isSelected
                ? "✓ Selected"
                : getDefaultPlanButtonText(button.dataset.plan);
        });


        document.getElementById("payment").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    function getDefaultPlanButtonText(planId) {
        const names = {
            monthly: "Select Monthly",
            twoMonths: "Select 2 Months",
            threeMonths: "Select 3 Months",
            annual: "Select Annual"
        };

        return names[planId] || "Select Plan";
    }


    document.querySelectorAll(".plan-button").forEach(button => {
        button.addEventListener("click", () => {
            selectPlan(button.dataset.plan);
        });
    });


    $("headerPremiumButton").addEventListener("click", () => {
        document.getElementById("premium").scrollIntoView({
            behavior: "smooth"
        });
    });


    /* =================================================
       COPY PAYMENT NUMBER
       ================================================= */

    $("copyPaymentNumber").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(
                CONFIG.paymentNumber
            );

            $("copyPaymentNumber").textContent = "Copied!";

        } catch (error) {
            /*
             * Clipboard access may require HTTPS and a
             * user gesture. Display the number if copying
             * is unavailable.
             */

            window.prompt(
                "Copy the Telebirr payment number:",
                CONFIG.paymentNumber
            );
        }
    });


    /* =================================================
       PAYMENT EMAIL

       This opens an email draft. It cannot attach a
       screenshot automatically or verify a payment.

       The user must attach the screenshot manually.
       ================================================= */

    emailPaymentButton.addEventListener("click", () => {
        if (!selectedPlanId) {
            alert("Please select a subscription plan first.");
            return;
        }


        const plan = CONFIG.plans[selectedPlanId];


        const subject =
            "Naol Ethiopia TV Premium Payment - " +
            plan.name;


        const body = [
            "Hello Naol Ethiopia TV Administrator,",
            "",
            "I would like to request premium activation.",
            "",
            "Selected plan: " + plan.name,
            "Duration: " + plan.months + " month(s)",
            "Amount: " + formatPrice(plan.price),
            "",
            "Payment method: Telebirr",
            "Payment number: " + CONFIG.paymentNumber,
            "",
            "Please find my payment screenshot attached.",
            "I understand that access begins after payment verification.",
            "",
            "My account email or username:",
            "",
            "Payment transaction reference:",
            "",
            "Thank you."
        ].join("\n");


        const mailto =
            "mailto:" +
            encodeURIComponent(CONFIG.paymentEmail) +
            "?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);


        window.location.href = mailto;
    });


    /* =================================================
       FOOTER YEAR
       ================================================= */

    $("currentYear").textContent =
        String(new Date().getFullYear());


    /* =================================================
       INITIALIZE
       ================================================= */

    updateChannelCards();

    setPlayerStatus("READY");

});
