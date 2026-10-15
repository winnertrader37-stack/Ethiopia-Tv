"use strict";

/* =====================================================
   NAOL ETHIOPIA TV LIVE
   Corrected Channel Search, Live Links and Player
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const $ = id => document.getElementById(id);

    /* ================================================
       1. CHANNEL CONFIGURATION
       ================================================ */

    /*
       officialUrl:
       Opens the broadcaster's official live page.

       streamUrl:
       Optional direct stream URL. Add only a verified,
       authorized stream URL that works in a browser.

       YouTube channel pages cannot always be embedded
       directly. Opening the official page is the fallback.
    */

    const channels = [
        {
            id: "etv-oromoo",
            name: "ETV Afaan Oromoo",
            shortName: "ETV",
            category: "news",
            description: "ETV Afaan Oromoo official channel",
            officialUrl:
                "https://www.youtube.com/@etvafaanoromoo/live",
            streamUrl: "",
            type: "link"
        },

        {
            id: "ebc",
            name: "EBC",
            shortName: "EBC",
            category: "news",
            description: "Ethiopian Broadcasting Corporation",
            officialUrl:
                "https://www.ebc.et/",
            streamUrl: "",
            type: "link"
        },

        {
            id: "fana",
            name: "Fana TV",
            shortName: "FANA",
            category: "news",
            description: "Fana TV official live page",
            officialUrl:
                "https://www.fanamc.com/english/live/",
            streamUrl: "",
            type: "link"
        },

        {
            id: "obn",
            name: "OBN Afaan Oromoo",
            shortName: "OBN",
            category: "regional",
            description: "Oromia Broadcasting Network",
            officialUrl:
                "https://www.youtube.com/@OBNoromiyaa/live",
            streamUrl: "",
            type: "link"
        },

        {
            id: "amhara",
            name: "Amhara Media",
            shortName: "AM",
            category: "regional",
            description: "Amhara regional broadcasting",
            officialUrl:
                "https://www.ameco.et/",
            streamUrl: "",
            type: "link"
        },

        {
            id: "addis",
            name: "Addis Media",
            shortName: "ADDIS",
            category: "entertainment",
            description: "Addis Media Network",
            officialUrl:
                "https://www.youtube.com/",
            streamUrl: "",
            type: "link"
        },

        {
            id: "etv-entertainment",
            name: "ETV Entertainment",
            shortName: "ETVE",
            category: "entertainment",
            description: "Ethiopian entertainment programs",
            officialUrl:
                "https://www.youtube.com/@ebcentertainment3193/live",
            streamUrl: "",
            type: "link"
        },

        {
            id: "etv-world",
            name: "EBC World",
            shortName: "WORLD",
            category: "news",
            description: "EBC World official channel",
            officialUrl:
                "https://www.youtube.com/@EBCworld/live",
            streamUrl: "",
            type: "link"
        }
    ];


    /* ================================================
       2. SUBSCRIPTION CONFIGURATION
       ================================================ */

    const plans = {
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
    };

    const PAYMENT_NUMBER = "0908052813";
    const PAYMENT_EMAIL = "natidesta67@gmail.com";


    /* ================================================
       3. APPLICATION STATE
       ================================================ */

    let selectedChannelId = null;
    let selectedPlanId = null;


    /* ================================================
       4. SAFE LOCAL STORAGE
       ================================================ */

    function loadFavorites() {
        try {
            const value = JSON.parse(
                localStorage.getItem("naol_tv_favorites") || "[]"
            );

            return Array.isArray(value) ? value : [];

        } catch (error) {
            return [];
        }
    }


    function saveFavorites(favorites) {
        try {
            localStorage.setItem(
                "naol_tv_favorites",
                JSON.stringify(favorites)
            );

        } catch (error) {
            console.warn("Favorites could not be saved.");
        }
    }


    /* ================================================
       5. PLAYER ELEMENTS
       ================================================ */

    const videoPlayer = $("videoPlayer");
    const embedPlayer = $("embedPlayer");
    const playerPlaceholder = $("playerPlaceholder");

    const playerTitle = $("playerTitle");
    const playerDescription = $("playerDescription");
    const playerStatus = $("playerStatus");
    const playerNotice = $("playerNotice");

    const videoContainer = $("videoContainer");


    /* ================================================
       6. NOTICE AND STATUS
       ================================================ */

    function showNotice(message, type = "") {

        if (!playerNotice) return;

        playerNotice.textContent = message;
        playerNotice.className = "player-notice";

        if (type) {
            playerNotice.classList.add(type);
        }
    }


    function setStatus(message) {

        if (playerStatus) {
            playerStatus.textContent = message;
        }
    }


    /* ================================================
       7. STOP CURRENT STREAM
       ================================================ */

    function stopPlayer() {

        if (videoPlayer) {

            try {
                videoPlayer.pause();
            } catch (error) {
                // Ignore pause errors.
            }

            videoPlayer.removeAttribute("src");
            videoPlayer.load();
            videoPlayer.hidden = true;
        }


        if (embedPlayer) {
            embedPlayer.src = "about:blank";
            embedPlayer.hidden = true;
        }


        if (playerPlaceholder) {
            playerPlaceholder.hidden = false;
        }
    }


    /* ================================================
       8. OPEN OFFICIAL TV PAGE
       ================================================ */

    function openOfficialChannel(channel) {

        if (!channel || !channel.officialUrl) {

            showNotice(
                "Linkii TV kanaa hin argamne.",
                "error"
            );

            return;
        }


        let url;

        try {
            url = new URL(channel.officialUrl);

        } catch (error) {

            showNotice(
                "Linkiin TV sirrii miti.",
                "error"
            );

            return;
        }


        if (url.protocol !== "https:") {

            showNotice(
                "Linkiin nageenya qabu miti.",
                "error"
            );

            return;
        }


        /*
         * Open the official broadcaster in a new tab.
         * This works even when the provider blocks iframe
         * embedding on third-party websites.
         */

        const opened = window.open(
            url.href,
            "_blank",
            "noopener,noreferrer"
        );


        if (!opened) {

            /*
             * Some mobile browsers block new windows.
             * Fall back to navigating the current tab.
             */

            window.location.href = url.href;

            return;
        }


        setStatus("OFFICIAL PAGE");

        showNotice(
            channel.name +
            " fuula ofiisaa irratti baname. " +
            "Yoo tamsaasa live jiraate achitti daawwadhu.",
            "success"
        );
    }


    /* ================================================
       9. VALIDATE EMBED URL
       ================================================ */

    function getValidEmbedUrl(value) {

        try {

            const url = new URL(value);

            if (url.protocol !== "https:") {
                return null;
            }


            const permittedHosts = [
                "www.youtube.com",
                "youtube.com",
                "www.youtube-nocookie.com"
            ];


            if (!permittedHosts.includes(url.hostname)) {
                return null;
            }


            if (!url.pathname.startsWith("/embed/")) {
                return null;
            }


            return url.href;

        } catch (error) {

            return null;
        }
    }


    /* ================================================
       10. PLAY DIRECT VIDEO
       ================================================ */

    function playDirectVideo(channel) {

        if (!videoPlayer) {

            openOfficialChannel(channel);

            return;
        }


        stopPlayer();

        videoPlayer.hidden = false;

        videoPlayer.src = channel.streamUrl;

        if (playerPlaceholder) {
            playerPlaceholder.hidden = true;
        }


        setStatus("LOADING");

        showNotice(
            "Tamsaasa TV fe'aa jira..."
        );


        videoPlayer.load();


        const promise = videoPlayer.play();


        if (promise && promise.catch) {

            promise.catch(function () {

                setStatus("PLAYBACK ERROR");

                showNotice(
                    "Tamsaasa kana taphachiisuu hin dandeenye. " +
                    "Linkiin sirrii ta'uu fi internet kee mirkaneessi. " +
                    "Fuula TV ofiisaa banuuf button Watch on Official TV tuqi.",
                    "error"
                );
            });
        }
    }


    /* ================================================
       11. PLAY EMBED
       ================================================ */

    function playEmbeddedVideo(channel) {

        const validUrl = getValidEmbedUrl(
            channel.streamUrl
        );


        if (!validUrl || !embedPlayer) {

            openOfficialChannel(channel);

            return;
        }


        stopPlayer();

        embedPlayer.hidden = false;
        embedPlayer.src = validUrl;


        if (playerPlaceholder) {
            playerPlaceholder.hidden = true;
        }


        setStatus("LOADING");

        showNotice(
            "Tamsaasa TV fe'aa jira..."
        );
    }


    /* ================================================
       12. SELECT CHANNEL
       ================================================ */

    function selectChannel(channelId) {

        const channel = channels.find(
            item => item.id === channelId
        );


        if (!channel) {

            showNotice(
                "Chaanaalii kana hin arganne.",
                "error"
            );

            return;
        }


        selectedChannelId = channel.id;


        if (playerTitle) {
            playerTitle.textContent = channel.name;
        }

        if (playerDescription) {
            playerDescription.textContent =
                channel.description;
        }


        renderChannels();


        /*
         * When an authorized stream URL is configured,
         * use the player. Otherwise, open the official page.
         */

        if (channel.streamUrl) {

            if (channel.type === "video") {
                playDirectVideo(channel);

            } else if (channel.type === "embed") {
                playEmbeddedVideo(channel);

            } else {
                openOfficialChannel(channel);
            }

        } else {

            openOfficialChannel(channel);
        }
    }


    /* ================================================
       13. FAVORITES
       ================================================ */

    function toggleFavorite(channelId) {

        let favorites = loadFavorites();


        if (favorites.includes(channelId)) {

            favorites = favorites.filter(
                id => id !== channelId
            );

        } else {

            favorites.push(channelId);
        }


        saveFavorites(favorites);

        renderChannels();
    }


    /* ================================================
       14. CREATE CHANNEL CARD
       ================================================ */

    function createChannelCard(channel) {

        const card = document.createElement("article");

        card.className = "channel-card";

        if (channel.id === selectedChannelId) {
            card.classList.add("active");
        }


        const top = document.createElement("div");
        top.className = "channel-card-top";


        const logo = document.createElement("div");
        logo.className = "channel-logo";
        logo.textContent = channel.shortName;


        const status = document.createElement("span");
        status.className = "channel-live-label";

        /*
         * Do not falsely label an unverified channel as LIVE.
         */

        status.textContent = "TV";


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

        watchButton.textContent = "▶ Watch TV";


        watchButton.addEventListener("click", function () {
            selectChannel(channel.id);
        });


        const favoriteButton = document.createElement("button");

        favoriteButton.type = "button";
        favoriteButton.className = "favorite-button";

        favoriteButton.textContent =
            loadFavorites().includes(channel.id)
                ? "♥"
                : "♡";


        if (loadFavorites().includes(channel.id)) {
            favoriteButton.classList.add("is-favorite");
        }


        favoriteButton.setAttribute(
            "aria-label",
            "Favorite " + channel.name
        );


        favoriteButton.addEventListener("click", function () {
            toggleFavorite(channel.id);
        });


        bottom.append(
            watchButton,
            favoriteButton
        );


        card.append(
            top,
            title,
            description,
            bottom
        );


        return card;
    }


    /* ================================================
       15. SEARCH AND FILTER
       ================================================ */

    function renderChannels() {

        const grid = $("channelGrid");
        const search = $("channelSearch");
        const category = $("channelCategory");
        const count = $("channelCount");
        const empty = $("emptyState");


        if (!grid) {
            console.error(
                "channelGrid not found. Check index.html."
            );

            return;
        }


        const query = search
            ? search.value.trim().toLowerCase()
            : "";


        const selectedCategory = category
            ? category.value
            : "all";


        const filtered = channels.filter(channel => {

            const matchesText =
                channel.name.toLowerCase().includes(query) ||
                channel.shortName.toLowerCase().includes(query) ||
                channel.description.toLowerCase().includes(query);


            const matchesCategory =
                selectedCategory === "all" ||
                channel.category === selectedCategory;


            return matchesText && matchesCategory;
        });


        grid.replaceChildren();


        filtered.forEach(channel => {

            grid.appendChild(
                createChannelCard(channel)
            );
        });


        if (count) {

            count.textContent =
                filtered.length +
                (filtered.length === 1
                    ? " Channel"
                    : " Channels");
        }


        if (empty) {
            empty.hidden = filtered.length > 0;
        }
    }


    const searchInput = $("channelSearch");

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            renderChannels
        );
    }


    const categorySelect = $("channelCategory");

    if (categorySelect) {
        categorySelect.addEventListener(
            "change",
            renderChannels
        );
    }


    /* ================================================
       16. FULL SCREEN
       ================================================ */

    const fullscreenButton = $("fullscreenButton");


    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async function () {

                try {

                    if (document.fullscreenElement) {

                        await document.exitFullscreen();

                        return;
                    }


                    if (
                        videoContainer &&
                        videoContainer.requestFullscreen
                    ) {

                        await videoContainer.requestFullscreen();

                    } else {

                        showNotice(
                            "Browser kee fullscreen hin deeggaru.",
                            "error"
                        );
                    }

                } catch (error) {

                    showNotice(
                        "Full screen banuu hin dandeenye. " +
                        "Browser kee keessatti fullscreen yaali.",
                        "error"
                    );
                }
            }
        );
    }


    /* ================================================
       17. ROTATE SCREEN
       ================================================ */

    const rotateButton = $("rotateButton");


    if (rotateButton) {

        rotateButton.addEventListener(
            "click",
            async function () {

                try {

                    if (
                        screen.orientation &&
                        screen.orientation.lock
                    ) {

                        await screen.orientation.lock(
                            "landscape"
                        );

                        showNotice(
                            "Landscape mode hojii irra oole.",
                            "success"
                        );

                    } else {

                        showNotice(
                            "Auto-rotate bilbila kee irraa bani; " +
                            "bilbila gara cinaatti garagalchi.",
                            "error"
                        );
                    }

                } catch (error) {

                    showNotice(
                        "Browser kee rotation lock hin deeggaru. " +
                        "Auto-rotate bilbila kee irraa bani.",
                        "error"
                    );
                }
            }
        );
    }


    /* ================================================
       18. CAST BUTTON
       ================================================ */

    const castButton = $("castButton");


    if (castButton) {

        castButton.addEventListener(
            "click",
            function () {

                showNotice(
                    "Cast guutuu hojjechiisuuf Chromecast SDK " +
                    "fi receiver configuration barbaachisa. " +
                    "Amma browser casting meeshaa kee yaali.",
                    "error"
                );
            }
        );
    }


    /* ================================================
       19. MOBILE MENU
       ================================================ */

    const menuButton = $("menuButton");
    const navigation = $("navigation");


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    navigation.classList.toggle("open");


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            }
        );


        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove("open");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            );
        });
    }


    /* ================================================
       20. SUBSCRIPTION PLANS
       ================================================ */

    function formatPrice(price) {

        return new Intl.NumberFormat("en-US").format(price) +
            " ETB";
    }


    function choosePlan(planId) {

        const plan = plans[planId];

        if (!plan) return;


        selectedPlanId = planId;


        const planName = $("selectedPlanName");
        const planPrice = $("selectedPlanPrice");
        const emailButton = $("emailPaymentButton");


        if (planName) {
            planName.textContent = plan.name;
        }

        if (planPrice) {
            planPrice.textContent = formatPrice(plan.price);
        }

        if (emailButton) {
            emailButton.disabled = false;
        }


        document.querySelectorAll(".plan-button").forEach(button => {

            const selected =
                button.dataset.plan === planId;


            button.textContent = selected
                ? "✓ Selected"
                : getPlanButtonLabel(button.dataset.plan);


            button.setAttribute(
                "aria-pressed",
                String(selected)
            );
        });


        const paymentSection = $("payment");

        if (paymentSection) {

            paymentSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }


    function getPlanButtonLabel(planId) {

        const labels = {
            monthly: "Select Monthly",
            twoMonths: "Select 2 Months",
            threeMonths: "Select 3 Months",
            annual: "Select Annual"
        };

        return labels[planId] || "Select Plan";
    }


    document.querySelectorAll(".plan-button").forEach(button => {

        button.addEventListener("click", function () {

            choosePlan(button.dataset.plan);
        });
    });


    const headerPremiumButton = $("headerPremiumButton");


    if (headerPremiumButton) {

        headerPremiumButton.addEventListener(
            "click",
            function () {

                const section = $("premium");

                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    }


    /* ================================================
       21. COPY PAYMENT NUMBER
       ================================================ */

    const copyButton = $("copyPaymentNumber");


    if (copyButton) {

        copyButton.addEventListener(
            "click",
            async function () {

                try {

                    await navigator.clipboard.writeText(
                        PAYMENT_NUMBER
                    );

                    copyButton.textContent = "Copied!";

                } catch (error) {

                    window.prompt(
                        "Copy Telebirr number:",
                        PAYMENT_NUMBER
                    );
                }
            }
        );
    }


    /* ================================================
       22. PAYMENT EMAIL
       ================================================ */

    const emailPaymentButton = $("emailPaymentButton");


    if (emailPaymentButton) {

        emailPaymentButton.addEventListener(
            "click",
            function () {

                if (!selectedPlanId) {

                    alert(
                        "Jalqaba subscription filadhu."
                    );

                    return;
                }


                const plan = plans[selectedPlanId];


                const subject =
                    "Naol Ethiopia TV Premium - " +
                    plan.name;


                const body = [
                    "Hello Administrator,",
                    "",
                    "I request premium activation.",
                    "",
                    "Plan: " + plan.name,
                    "Duration: " + plan.months + " month(s)",
                    "Amount: " + formatPrice(plan.price),
                    "Telebirr number: " + PAYMENT_NUMBER,
                    "",
                    "Please verify my payment.",
                    "I will attach my payment screenshot manually.",
                    "",
                    "Account email or username:",
                    "",
                    "Transaction reference:",
                    ""
                ].join("\n");


                const mailto =
                    "mailto:" + PAYMENT_EMAIL +
                    "?subject=" + encodeURIComponent(subject) +
                    "&body=" + encodeURIComponent(body);


                window.location.href = mailto;
            }
        );
    }


    /* ================================================
       23. FOOTER YEAR
       ================================================ */

    const yearElement = $("currentYear");

    if (yearElement) {
        yearElement.textContent =
            String(new Date().getFullYear());
    }


    /* ================================================
       24. INITIALIZE WEBSITE
       ================================================ */

    renderChannels();

    setStatus("READY");

    showNotice(
        "TV barbaadde filadhu. Tamsaasa hin galfamneef " +
        "button Watch TV fuula ofiisaa bana."
    );

    console.log(
        "Naol Ethiopia TV Live initialized successfully."
    );

});
