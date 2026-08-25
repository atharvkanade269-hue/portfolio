/* =========================================
   ASH - Living Web Companion
   Version 0.3
   ========================================= */

class AshCompanion {

    constructor() {

        this.element = null;

        this.x = window.innerWidth * 0.5;
        this.y = window.innerHeight * 0.7;

        this.targetX = this.x;

        this.speed = 1.5;
        this.direction = 1;

        this.state = "idle";

        this.nextActionTime = Date.now() + 2000;

        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;

        this.cursorAwareness = false;

        this.lastUserActivity = Date.now();
        this.isUserIdle = false;

        this.personality = {
            curiosity: 0.7,
            energy: 0.8,
            playfulness: 0.9
        };

        this.create();

        this.setupCursorTracking();

        this.setupUserActivity();

        this.start();
    }


    /* =========================================
       CREATE ASH
       ========================================= */

    create() {

        this.element = document.createElement("div");

        this.element.id = "ash-companion";

        this.element.innerHTML = `
            <div class="ash-hair"></div>

            <div class="ash-head">
                <div class="ash-eye left"></div>
                <div class="ash-eye right"></div>
                <div class="ash-mouth"></div>
            </div>

            <div class="ash-body"></div>

            <div class="ash-arm left"></div>
            <div class="ash-arm right"></div>

            <div class="ash-leg left"></div>
            <div class="ash-leg right"></div>

            <div class="ash-shadow"></div>
        `;

        document.body.appendChild(this.element);

        this.updatePosition();
    }


    /* =========================================
       START
       ========================================= */

    start() {

        this.chooseNewAction();

        this.loop();
    }


    /* =========================================
       MAIN LOOP
       ========================================= */

    loop() {

        this.update();

        requestAnimationFrame(() => this.loop());
    }


    /* =========================================
       UPDATE
       ========================================= */

    update() {

        this.checkUserActivity();

        if (
            this.state === "walking" ||
            this.state === "running"
        ) {

            this.move();
        }

        this.lookAtCursor();

        if (
            this.state !== "jumping" &&
            Date.now() > this.nextActionTime
        ) {

            this.chooseNewAction();
        }
    }


    /* =========================================
       CURSOR TRACKING
       ========================================= */

    setupCursorTracking() {

        window.addEventListener("mousemove", (event) => {

            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            const distanceX = this.mouseX - this.x;
            const distanceY = this.mouseY - this.y;

            const distance = Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );

            this.cursorAwareness = distance < 300;
        });
    }


    /* =========================================
       USER ACTIVITY
       ========================================= */

    setupUserActivity() {

        const resetActivity = () => {

            this.lastUserActivity = Date.now();

            if (this.isUserIdle) {

                this.isUserIdle = false;

                this.chooseNewAction();
            }
        };

        window.addEventListener("mousemove", resetActivity);

        window.addEventListener("click", resetActivity);

        window.addEventListener("keydown", resetActivity);

        window.addEventListener("scroll", resetActivity);
    }


    /* =========================================
       CHECK USER ACTIVITY
       ========================================= */

    checkUserActivity() {

        const inactiveTime =
            Date.now() - this.lastUserActivity;

        if (
            inactiveTime > 15000 &&
            !this.isUserIdle
        ) {

            this.isUserIdle = true;

            this.startBoredomMode();
        }
    }


    /* =========================================
       BOREDOM
       ========================================= */

    startBoredomMode() {

        this.state = "bored";

        this.element.classList.remove("ash-walking");

        this.element.classList.remove("ash-running");

        this.nextActionTime =
            Date.now() + 2000;
    }


    /* =========================================
       LOOK AT CURSOR
       ========================================= */

    lookAtCursor() {

        if (!this.cursorAwareness) {
            return;
        }

        const difference =
            this.mouseX - this.x;

        if (Math.abs(difference) < 10) {
            return;
        }

        this.direction =
            difference > 0 ? 1 : -1;

        this.updatePosition();
    }


    /* =========================================
       CHOOSE RANDOM ACTION
       ========================================= */

    chooseNewAction() {

        const actions = [
            "idle",
            "walk",
            "walk",
            "walk",
            "jump",
            "run"
        ];

        const action =
            actions[
                Math.floor(
                    Math.random() * actions.length
                )
            ];


        if (action === "walk") {

            this.startWalking();

        } else if (action === "run") {

            this.startRunning();

        } else if (action === "jump") {

            this.jump();

        } else {

            this.idle();
        }
    }


    /* =========================================
       IDLE
       ========================================= */

    idle() {

        this.state = "idle";

        this.speed = 1.5;

        this.element.classList.remove("ash-walking");

        this.element.classList.remove("ash-running");

        this.nextActionTime =
            Date.now() +
            1500 +
            Math.random() * 3000;
    }


    /* =========================================
       WALK
       ========================================= */

    startWalking() {

        this.state = "walking";

        this.speed = 1.5;

        this.element.classList.add("ash-walking");

        this.element.classList.remove("ash-running");

        this.direction =
            Math.random() > 0.5 ? 1 : -1;

        const distance =
            100 + Math.random() * 300;

        this.targetX =
            this.x +
            distance * this.direction;

        this.targetX =
            Math.max(
                50,
                Math.min(
                    window.innerWidth - 50,
                    this.targetX
                )
            );

        this.nextActionTime =
            Date.now() +
            3000 +
            Math.random() * 4000;
    }


    /* =========================================
       RUN
       ========================================= */

    startRunning() {

        this.state = "running";

        this.speed = 4;

        this.element.classList.add("ash-walking");

        this.element.classList.add("ash-running");

        this.direction =
            Math.random() > 0.5 ? 1 : -1;

        const distance =
            300 + Math.random() * 500;

        this.targetX =
            this.x +
            distance * this.direction;

        this.targetX =
            Math.max(
                50,
                Math.min(
                    window.innerWidth - 50,
                    this.targetX
                )
            );

        this.nextActionTime =
            Date.now() +
            1500 +
            Math.random() * 2000;
    }


    /* =========================================
       MOVEMENT
       ========================================= */

    move() {

        const difference =
            this.targetX - this.x;

        if (Math.abs(difference) < 2) {

            this.speed = 1.5;

            this.idle();

            return;
        }

        this.x +=
            Math.sign(difference) *
            this.speed;

        this.direction =
            Math.sign(difference);

        this.updatePosition();
    }


    /* =========================================
       JUMP
       ========================================= */

    jump() {

        this.state = "jumping";

        this.element.classList.remove("ash-walking");

        this.element.classList.remove("ash-running");

        this.element.classList.add("ash-jumping");

        setTimeout(() => {

            this.element.classList.remove(
                "ash-jumping"
            );

            this.state = "idle";

            this.nextActionTime =
                Date.now() + 2000;

        }, 700);
    }


    /* =========================================
       POSITION
       ========================================= */

    updatePosition() {

        this.element.style.left =
            `${this.x}px`;

        this.element.style.top =
            `${this.y}px`;

        this.element.style.transform =
            `translate(-50%, -50%) scaleX(${this.direction})`;
    }
}


/* =========================================
   START ASH AFTER PAGE LOAD
   ========================================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        window.ash =
            new AshCompanion();

    }
);