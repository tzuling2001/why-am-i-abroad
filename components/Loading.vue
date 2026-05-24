<template>
    <div class="loading fixed inset-0 z-[9999] h-screen w-full flex items-center justify-center overflow-hidden bg-white">
        <div class="loading-no absolute opacity-50 inset-0 z-1 flex flex-col items-start justify-start p-6 pointer-events-none" aria-hidden="true">
            <p class="loading-no-text">Noooooo</p>
            <p class="loading-no-text">Noooooo</p>
            <p class="loading-no-text">Noooooo</p>
        </div>

        <img
            src="~/assets/image/loading.webp"
            alt=""
            class="loading-bg w-full h-full object-cover absolute inset-0 z-10"
        >

        <div class="loading-scan absolute inset-0 z-20 pointer-events-none" aria-hidden="true" />

        <div class="loading-bar-wrap absolute left-1/2 -translate-x-1/2 bottom-[10%] z-30 w-[min(72vw,280px)]">
            <div class="loading-orbs mt-4 flex justify-center gap-2" aria-hidden="true">
                <span v-for="i in 3" :key="i" class="loading-orb" :style="{ animationDelay: `${(i - 1) * 0.15}s` }" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.loading-no-text {
    font-family: "Noto Sans TC", sans-serif;
    font-size: clamp(96px, 22vw, 220px);
    font-weight: 700;
    line-height: 0.85;
    color: #c80808;
    opacity: 0.92;
    mix-blend-mode: difference;
    animation: loading-no-stretch 2.6s ease-in-out infinite;
    transform-origin: left center;
}

.loading-bg {
    animation: loading-bg-pulse 2.4s ease-in-out infinite;
}

.loading-scan {
    background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(255, 255, 255, 0.06) 48%,
        transparent 100%
    );
    background-size: 100% 220%;
    animation: loading-scan 2.8s linear infinite;
}

.loading-label {
    animation: loading-label-wobble 2s ease-in-out infinite;
}

.loading-dots {
    display: inline-flex;
    width: 0.9em;
}

.loading-dot {
    animation: loading-dot-blink 1.2s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
    animation-delay: 0.4s;
}

.loading-bar-fill {
    width: 35%;
    animation: loading-bar-slide 1.8s ease-in-out infinite;
}

.loading-orb {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c80808;
    animation: loading-orb-bounce 0.9s ease-in-out infinite;
}

@keyframes loading-bg-pulse {
    0%,
    100% {
        transform: scale(1);
        filter: brightness(1);
    }

    50% {
        transform: scale(1.02);
        filter: brightness(1.04);
    }
}

@keyframes loading-scan {
    0% {
        background-position: 0 -120%;
    }

    100% {
        background-position: 0 120%;
    }
}

@keyframes loading-label-wobble {
    0%,
    100% {
        transform: rotate(8deg);
    }

    50% {
        transform: rotate(4deg) scale(1.04);
    }
}

@keyframes loading-dot-blink {
    0%,
    20%,
    100% {
        opacity: 0.15;
    }

    50% {
        opacity: 1;
    }
}

@keyframes loading-bar-slide {
    0% {
        transform: translateX(-120%);
        width: 28%;
    }

    50% {
        width: 55%;
    }

    100% {
        transform: translateX(320%);
        width: 28%;
    }
}

@keyframes loading-orb-bounce {
    0%,
    80%,
    100% {
        transform: translateY(0) scale(1);
        opacity: 0.45;
    }

    40% {
        transform: translateY(-8px) scale(1.15);
        opacity: 1;
    }
}
</style>
